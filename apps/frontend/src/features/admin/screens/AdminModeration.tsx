import {
    banUserAdminApi,
    deleteAdminEntityApi,
    getAdminModerationQueueApi,
    getMeApi,
    sendAdminWarningApi,
} from "@/features/admin/api";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function AdminModeration() {
    const [queue, setQueue] = useState<any[]>([]);
    const [entityType, setEntityType] = useState<"posts" | "courses" | "files">("posts");
    const [entityId, setEntityId] = useState("");
    const navigate = useNavigate();

    const load = async () => {
        const me = await getMeApi();
        if (me.profile?.role !== "ADMIN") {
            navigate("/");
            return;
        }
        setQueue(await getAdminModerationQueueApi());
    };

    useEffect(() => { load().catch(() => navigate("/")); }, []);

    const warn = async (item: any) => {
        const message = window.prompt("Warning to send to this creator:", item.moderationMessage || "");
        if (!message || !window.confirm("Send this official administrator warning?")) return;
        await sendAdminWarningApi(item.userId, message, `/profile/${item.user.username}`);
        toast.success("Warning sent");
    };

    const ban = async (item: any) => {
        const reason = window.prompt("Ban reason (shown to the user):", item.moderationMessage || "");
        if (!reason || !window.confirm("Ban this account and invalidate all active sessions?")) return;
        await banUserAdminApi(item.userId, reason);
        toast.success("Account banned");
    };

    const remove = async (type: "posts" | "courses" | "files", id: string) => {
        if (!id || !window.confirm(`Permanently delete this ${type.slice(0, -1)}? This cannot be undone.`)) return;
        await deleteAdminEntityApi(type, id);
        toast.success("Deleted");
        setQueue((current) => current.filter((item) => item.id !== id));
    };

    return (
        <div className="mx-auto w-full max-w-5xl space-y-5">
            <div className="rounded-md border border-red-300 bg-red-50 p-4">
                <h1 className="text-xl font-bold text-red-900">Administrator moderation</h1>
                <p className="text-sm text-red-800">Privileged actions require confirmation and may permanently remove content or access.</p>
            </div>
            <div className="rounded-md border p-4">
                <h2 className="mb-3 font-semibold">Moderation queue</h2>
                {queue.length === 0 ? <p className="text-gray-500">No flagged uploads.</p> : queue.map((item) => (
                    <div key={item.id} className="mb-3 rounded-md border p-3">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm">{item.moderationMessage}</div>
                        <div className="text-xs text-gray-500">Confidence: {Math.round((item.moderationScore ?? 0) * 100)}%</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <Button variant="outline" asChild><Link to={`/profile/${item.user.username}`}>View creator</Link></Button>
                            <Button variant="outline" onClick={() => warn(item)}>Send warning</Button>
                            <Button variant="destructive" onClick={() => remove("files", item.id)}>Delete file</Button>
                            <Button variant="destructive" onClick={() => ban(item)}>Ban account</Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="rounded-md border p-4">
                <h2 className="mb-2 font-semibold">Delete content by ID</h2>
                <div className="flex gap-2">
                    <select value={entityType} onChange={(event) => setEntityType(event.target.value as any)} className="rounded-md border px-3">
                        <option value="posts">Post</option>
                        <option value="courses">Course</option>
                        <option value="files">File</option>
                    </select>
                    <Input value={entityId} onChange={(event) => setEntityId(event.target.value)} placeholder="Content ID" />
                    <Button variant="destructive" onClick={() => remove(entityType, entityId)}>Delete</Button>
                </div>
            </div>
        </div>
    );
}
