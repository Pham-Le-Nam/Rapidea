import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getPostsByUsernameApi, getUserFoldersApi } from "@/api";
import { useAuth } from "@/context/AuthContext";
import UpsertPost from "../course/UpsertPost";
import { Post } from "../course/Posts";

function UserPosts() {
    const { username } = useParams();
    const navigate = useNavigate();
    const { logout, isLoggedIn } = useAuth();
    const [posts, setPosts] = useState<any[]>([]);
    const [isOwner, setIsOwner] = useState(false);
    const [freeFolder, setFreeFolder] = useState<any>();

    const loadPosts = async () => {
        try {
            if (!username) {
                throw new Error("No username found");
            }

            const response = await getPostsByUsernameApi(username);
            setPosts(response.posts ?? []);
            setIsOwner(response.isOwner);

            const folderResponse = await getUserFoldersApi(username);
            setFreeFolder(folderResponse.freeFolder);
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            }
            throw error;
        }
    }

    useEffect(() => {
        loadPosts();
    }, [username, isLoggedIn]);

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
                    fileFolder={freeFolder}
                    reloadPost={loadPosts}
                />
            )}

            <div className="flex w-full flex-col gap-3">
                {posts.length === 0 && (
                    <div className="rounded-md border p-6 text-center text-gray-500">
                        No posts yet.
                    </div>
                )}

                {posts.map((post) => (
                    <Post key={post.id} post={post} reloadPosts={loadPosts} />
                ))}
            </div>
        </div>
    )
}

export default UserPosts;
