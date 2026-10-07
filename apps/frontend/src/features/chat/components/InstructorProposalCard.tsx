import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/shared/components/ui/button";
import { applyInstructorProposalApi } from "../api";
import type { AiChatMessage, InstructorProposal } from "../model/types";

export function InstructorProposalCard({ message, onApplied }: { message: AiChatMessage; onApplied: (proposal: InstructorProposal) => void }) {
    const metadata = message.metadata as { proposal?: InstructorProposal } | undefined;
    const proposal = metadata?.proposal;
    const [open, setOpen] = useState(false);
    const [edited, setEdited] = useState<InstructorProposal | null>(null);
    const [saving, setSaving] = useState(false);
    if (!proposal) return null;
    const isPost = proposal.kind === "POST_DRAFT" || proposal.kind === "POST_REVISION";
    const canApply = proposal.kind === "POST_DRAFT" || (proposal.kind === "POST_REVISION" ? !!proposal.postId : !!proposal.courseId);
    const save = async () => {
        if (!edited || saving) return;
        const verb = proposal.kind === "POST_DRAFT" ? "Publish this reviewed post? It will become visible according to the course's access rules." : proposal.kind === "POST_REVISION" ? "Replace the existing post title and text with this revision? Attachments will be preserved." : "Save this reviewed proposal? It replaces the corresponding course plan, outcomes, skills or prerequisites.";
        if (!window.confirm(verb)) return;
        setSaving(true);
        try {
            const receipt = await applyInstructorProposalApi(message.id, edited);
            onApplied({ ...edited, appliedAt: receipt.appliedAt, resultId: receipt.resultId });
            setOpen(false); toast.success(isPost ? "Post saved" : "Course proposal saved");
        } catch (error: unknown) {
            const response = error as { response?: { data?: { message?: string } } };
            toast.error(response.response?.data?.message || "Couldn't apply proposal");
        } finally { setSaving(false); }
    };
    return <div className="mt-3 rounded-lg border border-main/20 bg-white p-3 text-sm">
        <p className="font-semibold">{proposal.title}</p>
        <p className="mt-1 text-xs text-gray-500">{proposal.appliedAt ? "Reviewed and saved" : "AI proposal — not saved or published"}</p>
        {!proposal.appliedAt && <Button size="sm" variant="outline" className="mt-2" onClick={() => { setEdited({ ...proposal, items: proposal.items.map(i => ({ ...i })) }); setOpen(true); }}>Review and edit</Button>}
        {proposal.resultId && isPost && <a className="ml-2 text-main underline" href={`/post/${proposal.resultId}`}>Open post</a>}
        {open && edited && <div role="dialog" aria-modal="true" aria-label="Review AI proposal" className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[85vh] w-full max-w-2xl space-y-3 overflow-y-auto rounded-xl bg-white p-5 shadow-xl">
                <h2 className="text-lg font-semibold">Review proposal</h2>
                <label className="block">Title<input className="mt-1 w-full rounded border p-2" value={edited.title} maxLength={250} onChange={e => setEdited({ ...edited, title: e.target.value })} /></label>
                <label className="block">{isPost ? "Post text" : "Notes"}<textarea className="mt-1 min-h-40 w-full rounded border p-2" value={edited.body} maxLength={20000} onChange={e => setEdited({ ...edited, body: e.target.value })} /></label>
                {edited.items.map((item, index) => <div key={index} className="space-y-1 rounded border p-2">
                    <label className="block text-xs">Item {index + 1}<input className="w-full rounded border p-2 text-sm" value={item.title} maxLength={500} onChange={e => setEdited({ ...edited, items: edited.items.map((i, n) => n === index ? { ...i, title: e.target.value } : i) })} /></label>
                    <textarea aria-label={`Item ${index + 1} details`} className="w-full rounded border p-2" value={item.details} maxLength={2000} onChange={e => setEdited({ ...edited, items: edited.items.map((i, n) => n === index ? { ...i, details: e.target.value } : i) })} />
                    <Button variant="ghost" size="sm" onClick={() => setEdited({ ...edited, items: edited.items.filter((_, n) => n !== index) })}>Remove item</Button>
                </div>)}
                {!isPost && <Button variant="outline" size="sm" disabled={edited.items.length >= 40} onClick={() => setEdited({ ...edited, items: [...edited.items, { title: "", details: "" }] })}>Add item</Button>}
                {!!proposal.canonicalSkills?.length && <div className="text-xs text-gray-600">{proposal.canonicalSkills.map(s => <p key={s.suggestedName}>{s.suggestedName}: {s.canonicalName ? `matches ${s.canonicalName}` : "will be resolved on approval; a new skill may be created"}</p>)}</div>}
                {!canApply && <p className="text-sm text-amber-700">Attach the intended owned course/post and request a new proposal before saving.</p>}
                <div className="flex justify-end gap-2">
                    <Button variant="outline" disabled={saving} onClick={() => setOpen(false)}>Cancel</Button>
                    <Button disabled={!canApply || saving || !edited.title.trim() || (isPost ? !edited.body.trim() : !edited.items.length || edited.items.some(i => !i.title.trim()))} onClick={save}>{saving ? "Saving..." : proposal.kind === "POST_DRAFT" ? "Publish reviewed post" : "Save reviewed proposal"}</Button>
                </div>
            </div>
        </div>}
    </div>;
}
