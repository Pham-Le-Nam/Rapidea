import { Button } from "@/components/ui/button";
import UpsertPost from "./UpsertPost";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { deletePostApi, getCourseApi, getFilesOfPostApi, getPostApi, getPostsOfCourseApi, getProfileApi, getProfileByIdApi } from "@/api";
import { TextRenderer } from "@/components/ui/texteditor";
import { 
    FileIcon, 
    MoreVerticalIcon,
    LinkIcon, 
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

function Posts({
    course
} : {
    course: any;
}) {
    const [posts, setPosts] = useState<any[]>([]);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isOwner, setIsOwner] = useState(false);

    const loadPosts = async () => {
        try {
            const postsResponse = await getPostsOfCourseApi(course.id);
            setIsOwner(postsResponse.isOwner);
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

    useEffect(() => {
        if (!course?.id) return;
        loadPosts();
    }, [course?.id]);

    return (
        <div className="flex flex-col justify-center items-center w-full gap-3">
            {isOwner &&
                <UpsertPost className="w-full h-full text-3xl" course={course} reloadPost={loadPosts}/>
            }

            {posts.map((post) => (
                <Post key={post.id} post={post} reloadPosts={loadPosts}/>
            ))}
            
        </div>
    );
}

type PostProps = {
    post?: any;
    reloadPosts?: () => Promise<void>;
}

function Post ({ post, reloadPosts }: PostProps) {
    const { id } = useParams();
    const [courseImg, setCourseImg] = useState(`${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`);
    const [ownerAvatar, setOwnerAvatar] = useState(`${import.meta.env.VITE_PHOTO_STORAGE}default_avatar.png`);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [course, setCourse] = useState<any>();
    const [isOwner, setIsOwner] = useState(false);
    const [owner, setOwner] = useState<any>();
    const [files, setFiles] = useState<any[]>([]);
    const [viewFile, setViewFile] = useState<any>();
    const [loadedPost, setLoadedPost] = useState(post);
    const containerWidth = post ? "w-full" : "w-full md:w-[80%]";

    const loadPostDetails = async () => {
        try {
            if (!loadedPost && !id) {
                throw new Error("Post Detail Not Found");
            }

            let postResponse: any;

            if (loadedPost) {
                postResponse = await getPostApi(loadedPost.id);
            } else if (id) {
                postResponse = await getPostApi(id);
            }

            setLoadedPost(postResponse.post);
            setIsOwner(postResponse.isOwner);

            const [courseResponse, ownerResponse, fileResponse] = await Promise.all([
                getCourseApi(loadedPost.courseId),
                getProfileByIdApi(loadedPost.userId),
                getFilesOfPostApi(loadedPost.id),
            ]);

            setCourse(courseResponse.course);
            setOwner(ownerResponse.profile);
            setCourseImg(courseResponse.course.imageUrl || `${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`);
            setOwnerAvatar(ownerResponse.profile.avatarUrl || `${import.meta.env.VITE_PHOTO_STORAGE}default_avatar.png`);

            if (fileResponse) {
                setFiles(fileResponse);
                setViewFile(fileResponse[0]);
            }

            if (reloadPosts) {
                reloadPosts();
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
                reloadPosts();
            }
            navigate(`/course/${course.id}`);
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

    useEffect(() => {
        loadPostDetails();
    }, [loadedPost?.id, id]);

    return (
        <div className={`flex flex-col justify-center items-start ${containerWidth} rounded-md border shadow-md p-3`}>
            <div className="relative flex flex-row w-full">
                <div className="flex flex-col">
                    <img src={courseImg} className=" border-2 w-20 aspect-2/1 object-cover rounded-md" onClick={() => navigate(`/course/${course?.id}`)}/>
                    <img src={ownerAvatar} className="rounded-full border-2 w-13 aspect-square -translate-y-1/2 translate-x-3" onClick={() => navigate(`/profile/${owner?.username}`)}/>
                </div>

                <div className="flex flex-col px-2">
                    <a className="font-bold text-lg hover:underline" href={`/course/${course?.id}`}>
                        {course?.title}
                    </a>
                    <a className="text-gray-500 hover:underline" href={`/profile/${owner?.username}`}>
                        {owner?.firstname} {owner?.middlename} {owner?.lastname}
                    </a>
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
            
            <TextRenderer content={loadedPost?.content} className="px-3 py-2"/>

            {files?.map((file, index) => (
                <Button 
                    className="w-full h-full min-w-0 flex items-center justify-start gap-2 rounded-xl border-2 bg-white hover:bg-gray-100 text-black text-lg font-normal [&>svg]:w-5 [&>svg]:h-5"
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
                <FileViewer file={viewFile} />
            }
        </div>
    )
}

export { 
    Posts,
    Post,
};