import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getCoursesApi, getPostsByUsernameApi, getUserFoldersApi } from "@/api";
import { useAuth } from "@/context/AuthContext";
import UpsertPost from "../course/UpsertPost";
import { Post } from "../course/Posts";
import LoadingScreen from "@/components/LoadingScreen";

const POSTS_PAGE_SIZE = 5;
type CourseFilter = "all" | "nonCourse" | string;
type PreviewMode = "all" | "preview" | "nonPreview";
type OrderMode = "newest" | "oldest" | "highestRated" | "lowestRated";

function UserPosts() {
    const { username } = useParams();
    const navigate = useNavigate();
    const { logout, isLoggedIn } = useAuth();
    const [posts, setPosts] = useState<any[]>([]);
    const [isOwner, setIsOwner] = useState(false);
    const [freeFolder, setFreeFolder] = useState<any>();
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [courseFilter, setCourseFilter] = useState<CourseFilter>("all");
    const [previewMode, setPreviewMode] = useState<PreviewMode>("all");
    const [orderMode, setOrderMode] = useState<OrderMode>("newest");
    const [courseOptions, setCourseOptions] = useState<any[]>([]);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const isLoadingPostsRef = useRef(false);
    const nextOffsetRef = useRef(0);

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

    const loadCourseOptions = async (profileUsername: string) => {
        const loadedCourses: any[] = [];
        let offset = 0;
        let hasMoreCourses = true;

        while (hasMoreCourses) {
            const response = await getCoursesApi(profileUsername, { offset, limit: 50 });
            const nextCourses = response.course ?? [];

            loadedCourses.push(...nextCourses);
            offset += nextCourses.length;
            hasMoreCourses = !!response.hasMore && nextCourses.length > 0;
        }

        return loadedCourses;
    }

    const loadPosts = async (reset = true) => {
        if (isLoadingPostsRef.current) return;

        isLoadingPostsRef.current = true;

        try {
            if (!username) {
                throw new Error("No username found");
            }

            if (reset) {
                setIsLoading(true);
            } else {
                setIsLoadingMore(true);
            }

            const offset = reset ? 0 : nextOffsetRef.current;
            const response = await getPostsByUsernameApi(username, {
                offset,
                limit: POSTS_PAGE_SIZE,
                courseId: courseFilter !== "all" && courseFilter !== "nonCourse" ? courseFilter : undefined,
                nonCourseOnly: courseFilter === "nonCourse",
                previewMode,
                ...getOrderOptions(),
            });
            const nextPosts = response.posts ?? [];

            setPosts((currentPosts) => {
                if (reset) {
                    return nextPosts;
                }

                const existingPostIds = new Set(currentPosts.map((post) => post.id));
                return [
                    ...currentPosts,
                    ...nextPosts.filter((post: any) => !existingPostIds.has(post.id)),
                ];
            });
            nextOffsetRef.current = offset + nextPosts.length;
            setHasMore(!!response.hasMore);
            setIsOwner(response.isOwner);

            if (reset) {
                const [folderResponse, coursesResponse] = await Promise.all([
                    getUserFoldersApi(username),
                    loadCourseOptions(username),
                ]);
                setFreeFolder(folderResponse.freeFolder);
                setCourseOptions(coursesResponse);
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            }
            throw error;
        } finally {
            isLoadingPostsRef.current = false;
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }

    useEffect(() => {
        setPosts([]);
        setHasMore(true);
        nextOffsetRef.current = 0;
        loadPosts(true);
    }, [username, isLoggedIn, courseFilter, previewMode, orderMode]);

    useEffect(() => {
        const target = loadMoreRef.current;

        if (!target || !hasMore || isLoading || isLoadingMore) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0]?.isIntersecting) {
                loadPosts(false);
            }
        }, { rootMargin: "200px" });

        observer.observe(target);

        return () => observer.disconnect();
    }, [hasMore, isLoading, isLoadingMore, posts.length, username, isLoggedIn, courseFilter, previewMode, orderMode]);

    return (
        <div className="flex w-full max-w-350 flex-col items-center gap-3 px-2">
            <div className="flex w-full items-center rounded-md border px-3 py-2 shadow-sm">
                <h1 className="text-xl font-bold">
                    Posts
                </h1>
            </div>

            {isOwner && (
                <UpsertPost
                    className="w-full h-full text-3xl"
                    courseOptions={courseOptions}
                    fileFolder={freeFolder}
                    reloadPost={loadPosts}
                />
            )}

            <div className="flex w-full flex-wrap items-center justify-end gap-2 rounded-md border p-2">
                <label className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Course</span>
                    <select
                        value={courseFilter}
                        onChange={(event) => setCourseFilter(event.target.value)}
                        className="h-9 rounded-md border bg-transparent px-3 text-sm"
                    >
                        <option value="all">All posts</option>
                        <option value="nonCourse">Non-course posts</option>
                        {courseOptions.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Preview</span>
                    <select
                        value={previewMode}
                        onChange={(event) => setPreviewMode(event.target.value as PreviewMode)}
                        className="h-9 rounded-md border bg-transparent px-3 text-sm"
                    >
                        <option value="all">All visibility</option>
                        <option value="preview">Preview posts</option>
                        <option value="nonPreview">Non-preview posts</option>
                    </select>
                </label>

                <label className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Order</span>
                    <select
                        value={orderMode}
                        onChange={(event) => setOrderMode(event.target.value as OrderMode)}
                        className="h-9 rounded-md border bg-transparent px-3 text-sm"
                    >
                        <option value="newest">Newest to oldest</option>
                        <option value="oldest">Oldest to newest</option>
                        <option value="highestRated">Highest rating</option>
                        <option value="lowestRated">Lowest rating</option>
                    </select>
                </label>
            </div>

            <div className="flex w-full flex-col gap-3">
                {isLoading ? (
                    <LoadingScreen label="Loading posts..." />
                ) : posts.length === 0 ? (
                    <div className="rounded-md border p-6 text-center text-gray-500">
                        No posts yet.
                    </div>
                ) : null}

                {posts.map((post) => (
                    <Post key={post.id} post={post} reloadPosts={loadPosts} courseOptions={courseOptions} />
                ))}

                <div ref={loadMoreRef} className="w-full">
                    {isLoadingMore && <LoadingScreen label="Loading more posts..." />}
                    {!hasMore && posts.length > 0 && (
                        <div className="rounded-md border p-3 text-center text-sm text-gray-500">
                            No more posts.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserPosts;
