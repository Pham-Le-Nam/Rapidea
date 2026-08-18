import LoadingScreen from "@/shared/components/LoadingScreen";
import { useAuth } from "@/providers";
import { getHomepageFeedApi } from "@/features/home/api";
import { Post } from "@/features/posts";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HOMEPAGE_PAGE_SIZE = 5;

function Homepage() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();
    const [posts, setPosts] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const isLoadingFeedRef = useRef(false);
    const nextOffsetRef = useRef(0);

    const loadFeed = async (reset = true) => {
        if (isLoadingFeedRef.current) return;

        isLoadingFeedRef.current = true;

        try {
            if (reset) {
                setIsLoading(true);
            } else {
                setIsLoadingMore(true);
            }

            const offset = reset ? 0 : nextOffsetRef.current;
            const response = await getHomepageFeedApi({
                offset,
                limit: HOMEPAGE_PAGE_SIZE,
            });
            const nextPosts = Array.isArray(response?.posts) ? response.posts : [];

            if (!Array.isArray(response?.posts)) {
                setHasMore(false);
                return;
            }

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
            setHasMore(!!response.hasMore && nextPosts.length === HOMEPAGE_PAGE_SIZE);
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
                return;
            }

            toast.error("Couldn't load recommended posts");
            throw error;
        } finally {
            isLoadingFeedRef.current = false;
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }

    useEffect(() => {
        setPosts([]);
        setHasMore(true);
        nextOffsetRef.current = 0;
        loadFeed(true);
    }, [isLoggedIn]);

    useEffect(() => {
        const target = loadMoreRef.current;

        if (!target || !hasMore || isLoading || isLoadingMore) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0]?.isIntersecting) {
                loadFeed(false);
            }
        }, { rootMargin: "240px" });

        observer.observe(target);

        return () => observer.disconnect();
    }, [hasMore, isLoading, isLoadingMore, posts.length, isLoggedIn]);

    return (
        <div className="flex w-full max-w-350 flex-col items-center gap-3 px-2">
            <div className="flex w-full flex-col gap-3">
                {isLoading ? (
                    <LoadingScreen label="Loading recommended posts..." />
                ) : posts.length === 0 ? (
                    <div className="rounded-md border p-6 text-center text-gray-500">
                        No recommended posts yet.
                    </div>
                ) : null}

                {posts.map((post) => (
                    <Post key={post.id} post={post} reloadPosts={() => loadFeed(true)} />
                ))}

                <div ref={loadMoreRef} className="w-full">
                    {isLoadingMore && <LoadingScreen label="Loading more recommended posts..." />}
                    {!hasMore && posts.length > 0 && (
                        <div className="rounded-md border p-3 text-center text-sm text-gray-500">
                            No more recommended posts.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Homepage;
