import { getNotificationsApi, markAllNotificationsReadApi, markNotificationReadApi } from "@/features/notifications/api";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotificationsPage() {
    const [items, setItems] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const load = async () => {
        setLoading(true);
        const response = await getNotificationsApi({ limit: 50 });
        setItems(response.notifications ?? []);
        setUnreadCount(response.unreadCount ?? 0);
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const open = async (notification: any) => {
        if (!notification.readAt) await markNotificationReadApi(notification.id);
        if (notification.link) navigate(notification.link);
        else await load();
    };

    const markAll = async () => {
        await markAllNotificationsReadApi();
        await load();
    };

    return (
        <div className="mx-auto w-full max-w-3xl rounded-md border p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-bold">All notifications</h1>
                {unreadCount > 0 && <Button variant="outline" onClick={markAll}>Mark all read</Button>}
            </div>
            {loading ? <p>Loading notifications...</p> : items.length === 0 ? (
                <p className="py-8 text-center text-gray-500">No notifications yet.</p>
            ) : (
                <div className="divide-y">
                    {items.map((item) => (
                        <button key={item.id} className="flex w-full gap-3 px-2 py-4 text-left hover:bg-gray-50" onClick={() => open(item)}>
                            {!item.readAt && <span className="mt-2 size-2 shrink-0 rounded-full bg-main" />}
                            <span>
                                <span className="block font-semibold">{item.title}</span>
                                <span className="block text-sm text-gray-600">{item.message}</span>
                                <span className="mt-1 block text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</span>
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
