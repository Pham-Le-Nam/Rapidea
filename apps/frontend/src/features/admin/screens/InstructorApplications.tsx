import {
    approveInstructorApplicationApi,
    getAdminInstructorApplicationsApi,
    getAdminInstructorDocumentApi,
    getMeApi,
} from "@/features/admin/api";
import { Button } from "@/shared/components/ui/button";
import { CheckCircleIcon, ExternalLinkIcon, InboxIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function InstructorApplications() {
    const navigate = useNavigate();
    const [applications, setApplications] = useState<any[]>([]);
    const [workingId, setWorkingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        const me = await getMeApi();
        if (me.profile?.role !== "ADMIN") {
            navigate("/");
            return;
        }
        setApplications(await getAdminInstructorApplicationsApi());
    };

    useEffect(() => {
        load()
            .catch(() => navigate("/"))
            .finally(() => setLoading(false));
    }, []);

    const viewDocument = async (application: any) => {
        try {
            setWorkingId(application.id);
            const blob = await getAdminInstructorDocumentApi(application.id);
            const url = URL.createObjectURL(blob);
            const openedWindow = window.open(url, "_blank", "noopener,noreferrer");
            if (!openedWindow) toast.error("Allow pop-ups to view the identity document");
            window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
        } catch {
            toast.error("Couldn't open identity document");
        } finally {
            setWorkingId(null);
        }
    };

    const approve = async (application: any) => {
        const name = `${application.user.firstname} ${application.user.lastname}`.trim();
        if (!window.confirm(`Approve ${name || application.user.username} as an instructor?`)) return;

        try {
            setWorkingId(application.id);
            await approveInstructorApplicationApi(application.id);
            setApplications((current) => current.filter((item) => item.id !== application.id));
            toast.success("Instructor access approved");
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Couldn't approve this application");
            await load();
        } finally {
            setWorkingId(null);
        }
    };

    return (
        <div className="mx-auto w-full max-w-5xl space-y-5">
            <div className="rounded-md border p-5 shadow-sm">
                <div className="flex items-center gap-3">
                    <InboxIcon className="size-6 text-main" />
                    <div>
                        <h1 className="text-xl font-bold">Instructor applications</h1>
                        <p className="text-sm text-gray-600">Review identity documents before granting creator access.</p>
                    </div>
                </div>
            </div>

            <section className="rounded-md border p-4 shadow-sm">
                {loading ? (
                    <p className="p-4 text-center text-gray-500">Loading applications...</p>
                ) : applications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <CheckCircleIcon className="mx-auto mb-2 size-8 text-green-600" />
                        No instructor applications are waiting for review.
                    </div>
                ) : applications.map((application) => (
                    <article key={application.id} className="mb-3 rounded-md border p-4 last:mb-0">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <Link to={`/profile/${application.user.username}`} className="font-semibold hover:underline">
                                    {application.user.firstname} {application.user.lastname}
                                </Link>
                                <div className="text-sm text-gray-600">@{application.user.username} · {application.user.email}</div>
                                <div className="mt-1 text-xs text-gray-500">
                                    Submitted {new Date(application.submittedAt).toLocaleString()} · {application.idDocumentName}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="outline" disabled={workingId === application.id} onClick={() => viewDocument(application)}>
                                    <ExternalLinkIcon className="size-4" />
                                    View ID
                                </Button>
                                <Button className="bg-main hover:bg-main-hover" disabled={workingId === application.id} onClick={() => approve(application)}>
                                    Approve instructor
                                </Button>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
}
