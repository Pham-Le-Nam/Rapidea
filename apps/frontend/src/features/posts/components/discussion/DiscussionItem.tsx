import { Check, Pencil, Reply, Trash2, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import type { Discussion, Profile } from "./types";
import { DEFAULT_AVATAR } from "./constants";
import { formatDate, getDiscussionText, getProfileName, handleDiscussionTextareaKeyDown, LinkedDiscussionText } from "./text";
import { DiscussionRating } from "./DiscussionRating";
import { buildMediaUrl } from "@/shared/lib/media";

type DiscussionItemProps = {
    discussion: Discussion;
    profile?: Profile;
    repliedProfile?: Profile;
    isOwner?: boolean;
    isEditing: boolean;
    editText: string;
    isSubmitting: boolean;
    canReply?: boolean;
    onReply: (discussion: Discussion) => void;
    onEdit: (discussion: Discussion) => void;
    onEditTextChange: (value: string) => void;
    onCancelEdit: () => void;
    onUpdate: (discussion: Discussion) => void;
    onDelete: (discussion: Discussion) => void;
    onOpenProfile: (profile?: Profile) => void;
    onRated?: () => Promise<void> | void;
}

export function DiscussionItem ({
    discussion,
    profile,
    repliedProfile,
    isOwner,
    isEditing,
    editText,
    isSubmitting,
    canReply = true,
    onReply,
    onEdit,
    onEditTextChange,
    onCancelEdit,
    onUpdate,
    onDelete,
    onOpenProfile,
    onRated,
}: DiscussionItemProps) {
    const getAvatarUrl = (profile?: Profile) => {
        const avatarUrl = profile?.avatarUrl || profile?.avatar?.name;

        if (!avatarUrl) return DEFAULT_AVATAR;

        return buildMediaUrl(avatarUrl);
    }

    return (
        <article className="flex w-full items-start gap-3">
            <button type="button" className="shrink-0" onClick={() => onOpenProfile(profile)}>
                <img
                    src={getAvatarUrl(profile)}
                    className="size-8 rounded-full border object-cover"
                />
            </button>

            <div className="min-w-0 flex-1">
                <div className="rounded-md bg-gray-50 px-3 py-2">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <button
                            type="button"
                            className="text-sm font-semibold text-gray-900 hover:underline"
                            onClick={() => onOpenProfile(profile)}
                        >
                            {profile ? getProfileName(profile) : "User"}
                        </button>
                        <span className="text-xs text-gray-500">
                            {formatDate(discussion.createdAt)}
                        </span>
                    </div>

                    {repliedProfile && (
                        <p className="mt-1 text-xs text-gray-500">
                            Replying to {getProfileName(repliedProfile)}
                        </p>
                    )}

                    {isEditing ? (
                        <div className="mt-2 flex flex-col gap-2">
                            <Textarea
                                value={editText}
                                className="min-h-16 resize-none bg-white text-sm"
                                onChange={(event) => onEditTextChange(event.target.value)}
                                onKeyDown={(event) => handleDiscussionTextareaKeyDown(event, () => onUpdate(discussion))}
                            />

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    disabled={isSubmitting}
                                    onClick={onCancelEdit}
                                >
                                    <X className="size-4" />
                                    Cancel
                                </Button>

                                <Button
                                    type="button"
                                    size="sm"
                                    className="bg-main hover:bg-main-hover"
                                    disabled={isSubmitting || !editText.trim()}
                                    onClick={() => onUpdate(discussion)}
                                >
                                    <Check className="size-4" />
                                    Save
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-1 whitespace-pre-wrap wrap-break-word text-sm text-gray-800">
                            <LinkedDiscussionText text={getDiscussionText(discussion.discussion)} />
                        </p>
                    )}
                </div>

                {!isEditing && (
                    <>
                        <DiscussionRating
                            discussionId={discussion.id}
                            averageRating={discussion.rating}
                            ratingCount={discussion.ratingCount}
                            onRated={onRated}
                        />

                        <div className="mt-1 flex flex-wrap items-center gap-1">
                            {canReply && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="xs"
                                    className="px-2 text-gray-600"
                                    onClick={() => onReply(discussion)}
                                >
                                    <Reply className="size-3" />
                                    Reply
                                </Button>
                            )}

                            {isOwner && (
                                <>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="xs"
                                        className="px-2 text-gray-600"
                                        onClick={() => onEdit(discussion)}
                                    >
                                        <Pencil className="size-3" />
                                        Edit
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="xs"
                                        className="px-2 text-red-600 hover:text-red-700"
                                        disabled={isSubmitting}
                                        onClick={() => onDelete(discussion)}
                                    >
                                        <Trash2 className="size-3" />
                                        Delete
                                    </Button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </article>
    )
}
