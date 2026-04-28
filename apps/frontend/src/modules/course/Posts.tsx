import { Button } from "@/components/ui/button";
import UpsertPost from "./UpsertPost";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { addRatePostApi, deletePostApi, getChildrenDiscussionsApi, getCourseApi, getDiscussionsByPostApi, getFilesOfPostApi, getPostApi, getPostsOfCourseApi, getProfileByIdApi, getRatePostApi, getUserFoldersApi, updateRatePostApi } from "@/api";
import { TextRenderer } from "@/components/ui/texteditor";
import { 
    FileIcon, 
    MoreVerticalIcon,
} from "lucide-react";
import FileViewer from "./FileViewer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CommentSection from "./Comment";
import { 
    HoverCard, 
    HoverCardContent, 
    HoverCardTrigger 
} from "@/components/ui/hover-card";
import StarRating from "@/components/StarRating";

function Posts({
    course,
    reloadCourse,
} : {
    course: any;
    reloadCourse?: () => Promise<void>;
}) {
    const [posts, setPosts] = useState<any[]>([]);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isOwner, setIsOwner] = useState(false);
    const [canViewAllPosts, setCanViewAllPosts] = useState(false);
    const [previewOnly, setPreviewOnly] = useState(false);
    const [orderMode, setOrderMode] = useState<"newest" | "oldest" | "highestRated" | "lowestRated">("newest");

    const getOrderOptions = () => {
        if (orderMode === "oldest") {
            return { orderBy: "createdAt" as const, order: "asc" as const };
        }

        if (orderMode === "highestRated") {
            return { orderBy: "rating" as const, order: "desc" as const };
        }

        if (orderMode === "lowestRated") {
            return { orderBy: "rating" as const, order: "asc" as const };
        }

        return { orderBy: "createdAt" as const, order: "desc" as const };
    }

    const loadPosts = async () => {
        try {
            const postsResponse = await getPostsOfCourseApi(course.id, {
                previewOnly,
                ...getOrderOptions(),
            });
            setIsOwner(postsResponse.isOwner);
            setCanViewAllPosts(postsResponse.canViewAllPosts);
            setPosts(postsResponse.posts);
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("Token Expired");
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login')
            // handle logout or redirect
            }
            throw error;
        }
    }

    const reloadCoursePosts = async () => {
        await loadPosts();
        await reloadCourse?.();
    }

    useEffect(() => {
        if (!course?.id) return;
        loadPosts();
    }, [course?.id, previewOnly, orderMode]);

    return (
        <div className="flex flex-col justify-center items-center w-full gap-3">
            <div className="flex w-full flex-wrap items-center justify-end gap-2 rounded-md border p-2">
                <label className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Filter</span>
                    <select
                        value={previewOnly ? "preview" : "all"}
                        onChange={(event) => setPreviewOnly(event.target.value === "preview")}
                        className="h-9 rounded-md border bg-transparent px-3 text-sm"
                    >
                        <option value="all">All posts</option>
                        <option value="preview">Preview posts</option>
                    </select>
                </label>

                <label className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Order</span>
                    <select
                        value={orderMode}
                        onChange={(event) => setOrderMode(event.target.value as typeof orderMode)}
                        className="h-9 rounded-md border bg-transparent px-3 text-sm"
                    >
                        <option value="newest">Newest to oldest</option>
                        <option value="oldest">Oldest to newest</option>
                        <option value="highestRated">Highest rating</option>
                        <option value="lowestRated">Lowest rating</option>
                    </select>
                </label>
            </div>

            {!isOwner && !canViewAllPosts && (
                <div className="w-full rounded-md border p-3 text-sm text-gray-600">
                    Subscribe to view full post content and files. Locked posts are blurred below.
                </div>
            )}

            {isOwner &&
                <UpsertPost className="w-full h-full text-3xl" course={course} reloadPost={reloadCoursePosts}/>
            }

            {posts.map((post) => (
                <Post key={post.id} post={post} reloadPosts={reloadCoursePosts} canViewAllPosts={canViewAllPosts}/>
            ))}
            
        </div>
    );
}

type PostProps = {
    post?: any;
    reloadPosts?: () => Promise<void>;
    canViewAllPosts?: boolean;
}

function Post ({ post, reloadPosts, canViewAllPosts }: PostProps) {
    const { id } = useParams();
    const targetPostId = post?.id ?? id;
    const [courseImg, setCourseImg] = useState(`${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`);
    const [ownerAvatar, setOwnerAvatar] = useState(`${import.meta.env.VITE_PHOTO_STORAGE}default_avatar.png`);
    const { logout, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [course, setCourse] = useState<any>();
    const [isOwner, setIsOwner] = useState(false);
    const [owner, setOwner] = useState<any>();
    const [fileFolder, setFileFolder] = useState<any>();
    const [files, setFiles] = useState<any[]>([]);
    const [viewFile, setViewFile] = useState<any>();
    const [loadedPost, setLoadedPost] = useState(post);
    const [canViewPost, setCanViewPost] = useState(!!post?.isPreview || !!canViewAllPosts);
    const [rating, setRating] = useState(0);
    const [isRated, setIsRated] = useState(false);
    const [isDiscussionShown, setIsDiscussionShown] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const containerWidth = post ? "w-full" : "w-full";

    const getPhotoUrl = (value?: string) => {
        if (!value) return "";

        if (value.startsWith("http")) {
            return value;
        }

        return `${import.meta.env.VITE_PHOTO_STORAGE}${value}`;
    }

    const loadPostDetails = async () => {
        try {
            if (!targetPostId) {
                throw new Error("Post Detail Not Found");
            }

            const postResponse = await getPostApi(targetPostId);

            const currentPost = postResponse.post;

            setLoadedPost(currentPost);
            setIsOwner(postResponse.isOwner);
            setCanViewPost(!!(postResponse.canViewPost ?? postResponse.isOwner ?? currentPost.isPreview ?? canViewAllPosts));

            const [courseResponse, ownerResponse, fileResponse] = await Promise.all([
                currentPost.courseId ? getCourseApi(currentPost.courseId) : Promise.resolve(undefined),
                getProfileByIdApi(currentPost.userId),
                getFilesOfPostApi(currentPost.id),
            ]);

            setCourse(courseResponse?.course);
            setOwner(ownerResponse.profile);
            setFileFolder(undefined);
            if (!currentPost.courseId && ownerResponse.profile?.username) {
                const folderResponse = await getUserFoldersApi(ownerResponse.profile.username);
                setFileFolder(folderResponse.freeFolder);
            }
            setCourseImg(
                courseResponse?.course?.thumbnail?.name
                    ? `${import.meta.env.VITE_PHOTO_STORAGE}${courseResponse.course.thumbnail.name}`
                    : `${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`
            );
            setOwnerAvatar(
                getPhotoUrl(ownerResponse.profile.avatarUrl || ownerResponse.profile.avatar?.name)
                    || `${import.meta.env.VITE_PHOTO_STORAGE}default_avatar.png`
            );

            if (fileResponse) {
                setFiles(fileResponse);
                setViewFile(fileResponse[0] ?? undefined);
            }

            setRating(0);
            setIsRated(false);
            if (isLoggedIn && currentPost) {
                const ratePostResponse = await getRatePostApi(currentPost.id);

                if (ratePostResponse?.isRated) {
                    const ratePost = ratePostResponse.ratePost;
                    setRating(ratePost.rating);
                    setIsRated(true);
                }
            }

        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("Token Expired");
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login')
            // handle logout or redirect
            }
            throw error;
        }
    }

    const deletePost = async () => {
        try {
            const post = await deletePostApi(loadedPost.id);

            if (!post) {
                toast.error("Couldn't delete the post");
                throw Error("Couldn't delete the post");
            }

            if (reloadPosts) {
                await reloadPosts();
            }
            navigate(course?.id ? `/course/${course.id}` : owner?.username ? `/posts/${owner.username}` : "/");
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("Token Expired");
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login')
            // handle logout or redirect
            }
            throw error;
        }
    }

    const copyLink = async () => {
        const link = `${window.location.origin}/post/${loadedPost.id}`;

        await navigator.clipboard.writeText(link);
        toast.success("Link copied to clipboard!");
    };

    const formatPostgresDate = (dateString: string) => {
        if (!dateString) return "";

        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (diffMinutes < 1) return "Just now";
        if (diffMinutes < 60) return `${diffMinutes}m ago`;

        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) return `${diffHours}h ago`;

        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 30) return `${diffDays}d ago`;

        return date.toLocaleDateString();
    }

    const ratePost = async (value: number) => {
        try {
            let ratingResponse: any;

            if (isRated) {
                ratingResponse = await updateRatePostApi(loadedPost?.id, value);
            }
            else {
                ratingResponse = await addRatePostApi(loadedPost?.id, value);
                setIsRated(true);
            }

            console.log(ratingResponse);

            setRating(value);

            // Reload to update rating of the post
            loadPostDetails();
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("Token Expired");
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login')
            // handle logout or redirect
            }
            throw error;
        }
    }

    const loadCommentCount = async () => {
        if (!loadedPost?.id || isPostLocked) {
            setCommentCount(0);
            return;
        }

        try {
            const response = await getDiscussionsByPostApi(loadedPost.id, 0, 1000);
            const parentComments = response.discussion ?? [];
            const childrenResponses = await Promise.all(
                parentComments.map((comment: any) => getChildrenDiscussionsApi(comment.id, 0, 1000))
            );
            const childrenCount = childrenResponses.reduce((count: number, response: any) => {
                return count + (response.discussion?.length ?? 0);
            }, 0);

            setCommentCount(parentComments.length + childrenCount);
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("Token Expired");
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login')
            }
        }
    }

    const toggleDiscussion = () => {
        if (isPostLocked) return;

        setIsDiscussionShown((currentValue) => !currentValue);
    }

    const isPostLocked = !!loadedPost?.courseId && !canViewPost;

    useEffect(() => {
        loadPostDetails();
    }, [targetPostId, isLoggedIn]);

    useEffect(() => {
        setIsDiscussionShown(false);
        setCommentCount(0);
        setFiles([]);
        setViewFile(undefined);
    }, [targetPostId]);

    useEffect(() => {
        loadCommentCount();
    }, [loadedPost?.id, isPostLocked]);

    useEffect(() => {
        if (isPostLocked) {
            setIsDiscussionShown(false);
        }
    }, [isPostLocked]);

    return (
        <div className={`flex flex-col justify-center items-start ${containerWidth} rounded-md border shadow-md p-3`}>
            <div className="relative flex flex-row w-full">
                <div className="flex flex-col">
                    {course?.id && (
                        <img src={courseImg} className=" border-2 w-20 aspect-2/1 object-cover rounded-md" onClick={() => navigate(`/course/${course.id}`)}/>
                    )}
                    <img src={ownerAvatar} className={`${course?.id ? "-translate-y-1/2 translate-x-3" : ""} rounded-full border-2 w-13 aspect-square object-cover`} onClick={() => navigate(`/profile/${owner?.username}`)}/>
                </div>

                <div className="flex flex-col px-2">
                    {course?.id ? (
                        <a className="font-bold text-lg hover:underline" href={`/course/${course.id}`}>
                            {course.title}
                        </a>
                    ) : null}
                    
                    <span className="text-gray-500">
                        <a className="text-gray-500 hover:underline" href={`/profile/${owner?.username}`}>
                            {owner?.firstname} {owner?.middlename} {owner?.lastname}
                        </a>
                        {` - ${formatPostgresDate(loadedPost?.createdAt)}`}
                    </span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="absolute right-0 hover:bg-gray-100 w-6 h-8 rounded-full">
                        <MoreVerticalIcon/>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Button 
                                variant="outline" 
                                className="w-full border-0 flex flex-row justify-start items-start font-normal shadow-none p-2"
                                onClick={copyLink}
                            >
                                Copy Link
                            </Button>
                        </DropdownMenuItem>

                        {isOwner && (
                            <div className="border-t">
                                <DropdownMenuItem asChild>
                                    <UpsertPost 
                                        post={loadedPost} 
                                        uploadedFiles={files} 
                                        course={course} 
                                        fileFolder={fileFolder}
                                        reloadPost={loadPostDetails}
                                        className="w-full border-0 flex flex-row justify-start items-start font-normal shadow-none p-2"
                                    />
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="w-full border-0 flex flex-row justify-start items-start font-normal shadow-none p-2">
                                                Delete
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="flex flex-col items-center">
                                            <DialogHeader className="flex flex-fol items-center">
                                                <DialogTitle>
                                                    Delete Post "{post?.title}"
                                                </DialogTitle>
                                            </DialogHeader>
                                            <DialogDescription>
                                                You could not undo this action.
                                            </DialogDescription>
                                            <DialogFooter className="pt-3">
                                                <DialogClose asChild>
                                                    <Button variant="outline">
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                                <DialogClose asChild>
                                                    <Button type="submit" className="bg-main hover:bg-main-hover" onClick={deletePost}>
                                                        Delete
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </DropdownMenuItem>
                            </div>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <h2 className="px-3 font-bold text-2xl whitespace-break-spaces">
                {loadedPost?.title}
            </h2>
            
            <div className={isPostLocked ? "w-full blur-sm select-none pointer-events-none" : "w-full"}>
                <TextRenderer content={loadedPost?.content} className="px-3 py-2"/>
            </div>

            {files?.map((file) => (
                <Button 
                    className={`w-full h-full min-w-0 flex items-center justify-start gap-2 rounded-xl border-2 bg-white hover:bg-gray-100 text-black text-lg font-normal [&>svg]:w-5 [&>svg]:h-5 ${isPostLocked ? "blur-sm pointer-events-none select-none" : ""}`}
                    key={file.id}
                    onClick={() => setViewFile(file)}
                >
                    <FileIcon />
                    <span className="wrap-anywhere whitespace-normal text-start">
                        {file.name}
                    </span>
                </Button>
            ))}

            {viewFile &&
                <div className={isPostLocked ? "w-full blur-sm pointer-events-none select-none" : "w-full"}>
                    <FileViewer file={viewFile} isLocked={isPostLocked} />
                </div>
            }

            <div className="flex flex-row items-center justify-between pt-2 pl-3 w-full">
                <a>
                    {loadedPost?.rating}⭐
                </a>
                {!isPostLocked && (
                    <button
                        type="button"
                        className="text-gray-700 hover:underline"
                        onClick={toggleDiscussion}
                    >
                        {commentCount} Discussion{commentCount === 1 ? "" : "s"}
                    </button>
                )}
            </div>

            <div className="flex flex-row items-center justify-start pt-2 w-full">
                {isLoggedIn && (
                    <HoverCard openDelay={100} closeDelay={100}>
                        <HoverCardTrigger asChild>
                            <Button variant="outline" className="flex-1 w-full font-normal">
                                <span className="wrap-anywhere whitespace-break-spaces">
                                    {isRated ? `${rating}⭐` : "Rate"}
                                </span>
                            </Button>
                        </HoverCardTrigger>

                        <HoverCardContent side="top" className="flex flex-col items-center w-50">
                            <StarRating value={rating} onChange={ratePost} />
                        </HoverCardContent>
                    </HoverCard>
                )}

                {!isPostLocked && (
                    <Button variant="outline" className="flex-1 font-normal" onClick={toggleDiscussion}>
                        <span className="wrap-anywhere whitespace-break-spaces">
                            Discussion
                        </span>
                    </Button>
                )}

                <Button variant="outline" className="flex-1 font-normal">
                    <span className="wrap-anywhere whitespace-break-spaces">
                        Share
                    </span>
                </Button>
            </div>

            {isDiscussionShown && (
                <CommentSection post={loadedPost} onCommentCountChange={loadCommentCount} />
            )}
        </div>
    )
}

export { 
    Posts,
    Post,
};
