import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Profile } from "./types";
import { getProfileName, handleDiscussionTextareaKeyDown } from "./text";

type DiscussionFormProps = {
    value: string;
    placeholder: string;
    isSubmitting: boolean;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

export function DiscussionForm ({
    value,
    placeholder,
    isSubmitting,
    onChange,
    onSubmit,
}: DiscussionFormProps) {
    return (
        <div className="flex w-full flex-col gap-2">
            <Textarea
                value={value}
                placeholder={placeholder}
                className="min-h-20 resize-none"
                onChange={(event) => onChange(event.target.value)}
                onKeyDown={(event) => handleDiscussionTextareaKeyDown(event, onSubmit)}
            />

            <div className="flex justify-end">
                <Button
                    type="button"
                    className="bg-main hover:bg-main-hover"
                    disabled={isSubmitting || !value.trim()}
                    onClick={onSubmit}
                >
                    <Send className="size-4" />
                    Discussion
                </Button>
            </div>
        </div>
    )
}

type ReplyFormProps = {
    value: string;
    isSubmitting: boolean;
    replyingTo?: Profile;
    onChange: (value: string) => void;
    onCancel: () => void;
    onSubmit: () => void;
}

export function ReplyForm ({
    value,
    isSubmitting,
    replyingTo,
    onChange,
    onCancel,
    onSubmit,
}: ReplyFormProps) {
    return (
        <div className="flex flex-col gap-2">
            <Textarea
                value={value}
                placeholder={`Reply${replyingTo ? ` to ${getProfileName(replyingTo)}` : ""}`}
                className="min-h-16 resize-none text-sm"
                onChange={(event) => onChange(event.target.value)}
                onKeyDown={(event) => handleDiscussionTextareaKeyDown(event, onSubmit)}
            />

            <div className="flex justify-end gap-2">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isSubmitting}
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button
                    type="button"
                    size="sm"
                    className="bg-main hover:bg-main-hover"
                    disabled={isSubmitting || !value.trim()}
                    onClick={onSubmit}
                >
                    <Send className="size-4" />
                    Reply
                </Button>
            </div>
        </div>
    )
}
