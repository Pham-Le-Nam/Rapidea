import {
    getInstructorApplicationApi,
    getMeApi,
    submitInstructorApplicationApi,
} from "@/features/settings/api";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useAuth } from "@/providers";
import { BadgeCheckIcon, BookOpenIcon, ShieldCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CreatorAiSettings from "./CreatorAiSettings";
import PayoutSettings from "./PayoutSettings";

type Application = {
    id: string;
    status: "PENDING" | "APPROVED" | "DISAPPROVED";
    idDocumentName: string;
    submittedAt: string;
    reviewedAt?: string | null;
    reapplyAt?: string | null;
};

export default function Settings() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<any>(null);
    const [application, setApplication] = useState<Application | null>(null);
    const [idDocument, setIdDocument] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        if (!application?.reapplyAt) return;
        setNow(Date.now());
        const timer = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(timer);
    }, [application?.reapplyAt]);

    const load = async () => {
        const [me, applicationResponse] = await Promise.all([
            getMeApi(),
            getInstructorApplicationApi(),
        ]);
        setProfile(me.profile);
        setApplication(applicationResponse.application ?? null);
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }
        load()
            .catch(() => toast.error("Couldn't load settings"))
            .finally(() => setLoading(false));
    }, [isLoggedIn]);

    const submit = async () => {
        if (!idDocument) {
            toast.error("Choose an identity document first");
            return;
        }
        try {
            setSubmitting(true);
            const response = await submitInstructorApplicationApi(idDocument);
            setApplication(response.application);
            setIdDocument(null);
            toast.success("Instructor application submitted for review");
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Couldn't submit instructor application");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-6 text-sm text-gray-500">Loading settings...</div>;

    const isCreator = profile?.role === "INSTRUCTOR" || profile?.role === "ADMIN";
    const remainingSeconds = application?.reapplyAt ? Math.max(0, Math.ceil((new Date(application.reapplyAt).getTime() - now) / 1000)) : 0;
    const canReapply = application?.status === "DISAPPROVED" && !!application.reapplyAt && remainingSeconds === 0;

    return (
        <div className="flex w-full max-w-5xl flex-col gap-5 px-2">
            <div className="rounded-md border p-5 shadow-sm">
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="mt-1 text-sm text-gray-600">
                    Manage your account type and creator preferences in one place.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase text-gray-700">
                    {isCreator ? <BadgeCheckIcon className="size-4 text-main" /> : <BookOpenIcon className="size-4" />}
                    {profile?.role?.toLowerCase()}
                </div>
            </div>

            {!isCreator && (
                <section className="rounded-md border p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                        <ShieldCheckIcon className="mt-0.5 size-6 shrink-0 text-main" />
                        <div>
                            <h2 className="text-lg font-bold">Become an instructor</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Verified instructors can create posts and courses. Upload a government-issued photo ID; it is available only to administrators reviewing your application.
                            </p>
                        </div>
                    </div>

                    {application?.status === "DISAPPROVED" ? (
                        <div className="mt-4 rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-950" role="status">
                            <div className="font-semibold">Application disapproved</div>
                            <div className="mt-1">Document: {application.idDocumentName}</div>
                            {application.reviewedAt && <div>Reviewed: {new Date(application.reviewedAt).toLocaleString()}</div>}
                            <p className="mt-2">Your instructor application was disapproved. Your account remains a learner.</p>
                            {application.reapplyAt && (
                                <p className="mt-2">
                                    {remainingSeconds > 0
                                        ? `You can apply again in ${Math.floor(remainingSeconds / 60)}:${String(remainingSeconds % 60).padStart(2, "0")} (at ${new Date(application.reapplyAt).toLocaleTimeString()}).`
                                        : "You can now apply again with a new identity document."}
                                </p>
                            )}
                        </div>
                    ) : application ? (
                        <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
                            <div className="font-semibold">Application pending review</div>
                            <div className="mt-1">Document: {application.idDocumentName}</div>
                            <div>Submitted: {new Date(application.submittedAt).toLocaleString()}</div>
                            <p className="mt-2">You will receive a notification when an administrator reviews your application.</p>
                        </div>
                    ) : null}
                    {(!application || canReapply) && (
                        <div className="mt-5 space-y-3">
                            <Input
                                type="file"
                                accept="application/pdf,image/jpeg,image/png,image/webp"
                                onChange={(event) => setIdDocument(event.target.files?.[0] ?? null)}
                            />
                            <p className="text-xs text-gray-500">PDF, JPG, PNG, or WebP. Maximum size 10 MB.</p>
                            <Button className="bg-main hover:bg-main-hover" disabled={submitting} onClick={submit}>
                                {submitting ? "Submitting..." : canReapply ? "Apply again" : "Apply to become an instructor"}
                            </Button>
                        </div>
                    )}
                </section>
            )}

            {isCreator && (
                <>
                    <PayoutSettings />
                    <CreatorAiSettings />
                </>
            )}
        </div>
    );
}
