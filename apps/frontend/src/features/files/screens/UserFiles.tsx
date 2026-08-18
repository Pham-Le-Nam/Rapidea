import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserFoldersApi } from "@/features/files/api";
import { useAuth } from "@/providers";
import Files from "../components/Files";
import LoadingScreen from "@/shared/components/LoadingScreen";

function UserFiles() {
    const { username } = useParams();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [rootFolder, setRootFolder] = useState<any>();

    const loadRootFolder = async () => {
        try {
            if (!username) {
                throw new Error("No username found");
            }

            const response = await getUserFoldersApi(username);
            setRootFolder(response.rootFolder);
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
        loadRootFolder();
    }, [username]);

    return (
        <div className="flex w-full max-w-350 flex-col items-center gap-3 px-2">
            <div className="flex w-full items-center rounded-md border px-3 py-2 shadow-sm">
                <h1 className="text-xl font-bold">
                    Files
                </h1>
            </div>

            {rootFolder ? (
                <Files rootFolderId={rootFolder.id} lockRootActions />
            ) : (
                <LoadingScreen label="Loading files..." />
            )}
        </div>
    )
}

export default UserFiles;
