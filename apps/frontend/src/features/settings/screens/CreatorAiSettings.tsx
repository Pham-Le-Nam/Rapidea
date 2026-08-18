import { getMeApi, updateCreatorPromptApi } from "@/features/settings/api";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CreatorAiSettings() {
    const [prompt, setPrompt] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getMeApi()
            .then((response) => setPrompt(response.profile?.creatorPrompt ?? ""))
            .catch(() => toast.error("Couldn't load creator preferences"));
    }, []);

    const save = async () => {
        try {
            setSaving(true);
            await updateCreatorPromptApi(prompt);
            toast.success("Creator AI preferences saved");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Couldn't save preferences");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-md border p-5 shadow-sm">
            <div>
                <h1 className="text-xl font-bold">Creator AI preferences</h1>
                <p className="mt-1 text-sm text-gray-600">
                    These preferences guide title and post-detail generation. Platform safety policies always take priority.
                </p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="creator-prompt">Writing preferences</Label>
                <Textarea
                    id="creator-prompt"
                    value={prompt}
                    maxLength={4000}
                    rows={10}
                    placeholder="Example: Use a friendly academic tone, Australian English, short paragraphs, and practical examples."
                    onChange={(event) => setPrompt(event.target.value)}
                />
                <div className="text-right text-xs text-gray-500">{prompt.length}/4000</div>
            </div>
            <Button disabled={saving} onClick={save} className="self-end bg-main hover:bg-main-hover">
                {saving ? "Saving..." : "Save preferences"}
            </Button>
        </div>
    );
}
