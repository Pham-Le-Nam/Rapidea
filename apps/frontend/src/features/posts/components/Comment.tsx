import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/providers";
import { addDiscussionApi, deleteDiscussionApi, getChildrenDiscussionsApi, getDiscussionByIdApi, getDiscussionsByPostApi, getProfileByIdApi, updateDiscussionApi } from "@/features/posts/api";
import { DISCUSSION_PAGE_SIZE } from "./discussion/constants";
import { DiscussionForm, ReplyForm } from "./discussion/DiscussionForm";
import { DiscussionItem } from "./discussion/DiscussionItem";
import type { CommentProps, Discussion, Profile } from "./discussion/types";
import { createDiscussionContent, findRepliedUserId, getDiscussionText } from "./discussion/text";

function CommentSection ({ 
    className = "w-full mt-3 border-t pt-3",
    post,
    onCommentCountChange,
} : CommentProps) {
    const [comments, setComments] = useState<Discussion[]>([]);
    const [childrenByParentId, setChildrenByParentId] = useState<Record<string, Discussion[]>>({});
    const [childrenCountByParentId, setChildrenCountByParentId] = useState<Record<string, number>>({});
    const [shownChildrenByParentId, setShownChildrenByParentId] = useState<Record<string, boolean>>({});
    const [childrenHasMoreByParentId, setChildrenHasMoreByParentId] = useState<Record<string, boolean>>({});
    const [childrenLoadingByParentId, setChildrenLoadingByParentId] = useState<Record<string, boolean>>({});
    const [profilesByUserId, setProfilesByUserId] = useState<Record<string, Profile>>({});
    const [commentText, setCommentText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [replyingTo, setReplyingTo] = useState<Discussion | null>(null);
    const [ownerByDiscussionId, setOwnerByDiscussionId] = useState<Record<string, boolean>>({});
    const [editingDiscussionId, setEditingDiscussionId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMoreParents, setIsLoadingMoreParents] = useState(false);
    const [hasMoreParents, setHasMoreParents] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const allDiscussions = useMemo(() => {
        return [
            ...comments,
            ...Object.values(childrenByParentId).flat(),
        ];
    }, [comments, childrenByParentId]);

    const isNoDiscussionsError = (error: any) => (
        error.response?.status === 404
            && String(error.response?.data?.message ?? "").toLowerCase().includes("discussion")
    );

    const loadProfile = async (userId: string) => {
        if (!userId || profilesByUserId[userId]) return;

        try {
            const response = await getProfileByIdApi(userId);
            setProfilesByUserId((currentProfiles) => ({
                ...currentProfiles,
                [userId]: response.profile,
            }));
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            }
        }
    }

    const loadDiscussionOwner = async (discussionId: string) => {
        if (!isLoggedIn || !discussionId || ownerByDiscussionId[discussionId] !== undefined) return;

        try {
            const response = await getDiscussionByIdApi(discussionId);
            setOwnerByDiscussionId((currentOwners) => ({
                ...currentOwners,
                [discussionId]: response.isOwner,
            }));
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            }
        }
    }

    const loadComments = async () => {
        if (!post?.id) return;

        setIsLoading(true);

        try {
            const response = await getDiscussionsByPostApi(post.id, 0, DISCUSSION_PAGE_SIZE);
            const parentComments = response.discussion ?? [];
            setComments(parentComments);
            setChildrenByParentId({});
            setChildrenCountByParentId({});
            setShownChildrenByParentId({});
            setChildrenHasMoreByParentId({});
            setHasMoreParents(parentComments.length === DISCUSSION_PAGE_SIZE);
            await loadChildrenCounts(parentComments);
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            } else if (isNoDiscussionsError(error)) {
                setComments([]);
                setChildrenByParentId({});
                setChildrenCountByParentId({});
                setShownChildrenByParentId({});
                setChildrenHasMoreByParentId({});
                setHasMoreParents(false);
            } else {
                toast.error("Couldn't load discussions");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const loadMoreParentDiscussions = async () => {
        if (!post?.id || isLoadingMoreParents) return;

        setIsLoadingMoreParents(true);

        try {
            const response = await getDiscussionsByPostApi(post.id, comments.length, DISCUSSION_PAGE_SIZE);
            const nextComments = response.discussion ?? [];
            setComments((currentComments) => [...currentComments, ...nextComments]);
            setHasMoreParents(nextComments.length === DISCUSSION_PAGE_SIZE);
            await loadChildrenCounts(nextComments);
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            } else if (isNoDiscussionsError(error)) {
                setHasMoreParents(false);
            } else {
                toast.error("Couldn't load more discussions");
            }
        } finally {
            setIsLoadingMoreParents(false);
        }
    }

    const loadChildrenDiscussions = async (parentId: string, shouldAppend: boolean = false) => {
        if (!parentId || childrenLoadingByParentId[parentId]) return;

        setChildrenLoadingByParentId((currentLoading) => ({
            ...currentLoading,
            [parentId]: true,
        }));

        try {
            const currentChildren = childrenByParentId[parentId] ?? [];
            const startIndex = shouldAppend ? currentChildren.length : 0;
            const response = await getChildrenDiscussionsApi(parentId, startIndex, DISCUSSION_PAGE_SIZE);
            const nextChildren = response.discussion ?? [];

            setChildrenByParentId((currentChildrenByParentId) => ({
                ...currentChildrenByParentId,
                [parentId]: shouldAppend
                    ? [...(currentChildrenByParentId[parentId] ?? []), ...nextChildren]
                    : nextChildren,
            }));
            setChildrenHasMoreByParentId((currentHasMore) => ({
                ...currentHasMore,
                [parentId]: childrenCountByParentId[parentId] !== undefined
                    ? startIndex + nextChildren.length < childrenCountByParentId[parentId]
                    : nextChildren.length === DISCUSSION_PAGE_SIZE,
            }));
            setShownChildrenByParentId((currentShown) => ({
                ...currentShown,
                [parentId]: true,
            }));
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            } else if (isNoDiscussionsError(error)) {
                setChildrenByParentId((currentChildrenByParentId) => ({
                    ...currentChildrenByParentId,
                    [parentId]: [],
                }));
                setChildrenHasMoreByParentId((currentHasMore) => ({
                    ...currentHasMore,
                    [parentId]: false,
                }));
                setShownChildrenByParentId((currentShown) => ({
                    ...currentShown,
                    [parentId]: true,
                }));
            } else {
                toast.error("Couldn't load follow up discussions");
            }
        } finally {
            setChildrenLoadingByParentId((currentLoading) => ({
                ...currentLoading,
                [parentId]: false,
            }));
        }
    }

    const loadChildrenCounts = async (parentComments: Discussion[]) => {
        if (parentComments.length === 0) return;

        const countEntries = await Promise.all(
            parentComments.map(async (comment) => {
                try {
                    const response = await getChildrenDiscussionsApi(comment.id, 0, 1000);
                    return [comment.id, response.discussion?.length ?? 0] as const;
                } catch (error: any) {
                    if (isNoDiscussionsError(error)) {
                        return [comment.id, 0] as const;
                    }

                    throw error;
                }
            })
        );

        setChildrenCountByParentId((currentCounts) => ({
            ...currentCounts,
            ...Object.fromEntries(countEntries),
        }));
    }

    const refreshChildrenCount = async (parentId: string) => {
        let childrenCount = 0;

        try {
            const response = await getChildrenDiscussionsApi(parentId, 0, 1000);
            childrenCount = response.discussion?.length ?? 0;
        } catch (error: any) {
            if (!isNoDiscussionsError(error)) {
                throw error;
            }
        }

        setChildrenCountByParentId((currentCounts) => ({
            ...currentCounts,
            [parentId]: childrenCount,
        }));
    }

    const toggleChildrenDiscussions = async (parentId: string) => {
        if (shownChildrenByParentId[parentId]) {
            setShownChildrenByParentId((currentShown) => ({
                ...currentShown,
                [parentId]: false,
            }));
            return;
        }

        if (childrenByParentId[parentId]?.length) {
            setShownChildrenByParentId((currentShown) => ({
                ...currentShown,
                [parentId]: true,
            }));
            return;
        }

        await loadChildrenDiscussions(parentId);
    }

    const submitComment = async (repliedId?: string) => {
        const content = repliedId ? replyText.trim() : commentText.trim();

        if (!content) return;

        if (!isLoggedIn) {
            toast.error("Please log in to discuss");
            navigate("/login");
            return;
        }

        setIsSubmitting(true);

        try {
            await addDiscussionApi(post.id, createDiscussionContent(content), repliedId);

            if (repliedId) {
                setReplyText("");
                setReplyingTo(null);
                const parentId = replyingTo?.parentId ?? replyingTo?.id;
                if (parentId) {
                    await loadChildrenDiscussions(parentId);
                    await refreshChildrenCount(parentId);
                }
            } else {
                setCommentText("");
                await loadComments();
            }
            onCommentCountChange?.();
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            } else {
                toast.error("Couldn't add discussion");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    const beginReply = (discussion: Discussion) => {
        setReplyingTo(discussion);
        setEditingDiscussionId(null);
        setReplyText("");
    }

    const beginEdit = (discussion: Discussion) => {
        setReplyingTo(null);
        setEditingDiscussionId(discussion.id);
        setEditText(getDiscussionText(discussion.discussion));
    }

    const cancelEdit = () => {
        setEditingDiscussionId(null);
        setEditText("");
    }

    const updateDiscussion = async (discussion: Discussion) => {
        const content = editText.trim();

        if (!content) return;

        setIsSubmitting(true);

        try {
            await updateDiscussionApi(discussion.id, createDiscussionContent(content));
            cancelEdit();
            await loadComments();
            onCommentCountChange?.();
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            } else {
                toast.error("Couldn't update discussion");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    const deleteDiscussion = async (discussion: Discussion) => {
        const shouldDelete = window.confirm("Delete this discussion?");

        if (!shouldDelete) return;

        setIsSubmitting(true);

        try {
            await deleteDiscussionApi(discussion.id);
            if (replyingTo?.id === discussion.id) setReplyingTo(null);
            if (editingDiscussionId === discussion.id) cancelEdit();
            await loadComments();
            onCommentCountChange?.();
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            } else {
                toast.error("Couldn't delete discussion");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    const openProfile = (profile?: Profile) => {
        if (!profile?.username) return;

        navigate(`/profile/${profile.username}`);
    }

    const refreshDiscussion = async (discussionId: string) => {
        const response = await getDiscussionByIdApi(discussionId);
        const updatedDiscussion = response.discusssion ?? response.discussion;

        if (!updatedDiscussion) return;

        setComments((currentComments) => currentComments.map((discussion) => (
            discussion.id === discussionId ? updatedDiscussion : discussion
        )));
        setChildrenByParentId((currentChildrenByParentId) => {
            const nextChildrenByParentId = { ...currentChildrenByParentId };

            Object.entries(nextChildrenByParentId).forEach(([parentId, children]) => {
                nextChildrenByParentId[parentId] = children.map((discussion) => (
                    discussion.id === discussionId ? updatedDiscussion : discussion
                ));
            });

            return nextChildrenByParentId;
        });
    }

    useEffect(() => {
        loadComments();
    }, [post?.id]);

    useEffect(() => {
        allDiscussions.forEach((discussion) => {
            loadProfile(discussion.userId);
            loadDiscussionOwner(discussion.id);
        });
    }, [allDiscussions]);

    return (
        <section className={className}>
            {isLoggedIn && (
                <DiscussionForm
                    value={commentText}
                    placeholder="Write a discussion"
                    isSubmitting={isSubmitting}
                    onChange={setCommentText}
                    onSubmit={() => submitComment()}
                />
            )}

            <div className="mt-4 flex w-full flex-col gap-4">
                {isLoading && (
                    <p className="text-sm text-gray-500">Loading discussions...</p>
                )}

                {!isLoading && comments.length === 0 && (
                    <p className="text-sm text-gray-500">No discussions yet.</p>
                )}

                {comments.map((comment) => {
                    const replies = childrenByParentId[comment.id] ?? [];
                    const childrenCount = childrenCountByParentId[comment.id] ?? 0;
                    const areChildrenShown = shownChildrenByParentId[comment.id];
                    const areChildrenLoading = childrenLoadingByParentId[comment.id];
                    const hasMoreChildren = childrenHasMoreByParentId[comment.id];

                    return (
                        <div key={comment.id} className="flex w-full flex-col gap-3">
                            <DiscussionItem
                                discussion={comment}
                                profile={profilesByUserId[comment.userId]}
                                isOwner={ownerByDiscussionId[comment.id]}
                                isEditing={editingDiscussionId === comment.id}
                                editText={editText}
                                isSubmitting={isSubmitting}
                                canReply={isLoggedIn}
                                onReply={beginReply}
                                onEdit={beginEdit}
                                onEditTextChange={setEditText}
                                onCancelEdit={cancelEdit}
                                onUpdate={updateDiscussion}
                                onDelete={deleteDiscussion}
                                onOpenProfile={openProfile}
                                onRated={() => refreshDiscussion(comment.id)}
                            />

                            {replyingTo?.id === comment.id && (
                                <div className="ml-10 border-l pl-3">
                                    <ReplyForm
                                        value={replyText}
                                        isSubmitting={isSubmitting}
                                        replyingTo={profilesByUserId[replyingTo.userId]}
                                        onChange={setReplyText}
                                        onCancel={() => setReplyingTo(null)}
                                        onSubmit={() => submitComment(replyingTo.id)}
                                    />
                                </div>
                            )}

                            {childrenCount > 0 && (
                                <div className="ml-10 flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="xs"
                                        className="px-2 text-gray-600"
                                        disabled={areChildrenLoading}
                                        onClick={() => toggleChildrenDiscussions(comment.id)}
                                    >
                                        {areChildrenShown
                                            ? `Hide ${childrenCount} follow up discussion${childrenCount === 1 ? "" : "s"}`
                                            : `Show ${childrenCount} follow up discussion${childrenCount === 1 ? "" : "s"}`}
                                    </Button>

                                    {areChildrenLoading && (
                                        <span className="text-xs text-gray-500">Loading...</span>
                                    )}
                                </div>
                            )}

                            {areChildrenShown && replies.length === 0 && !areChildrenLoading && (
                                <p className="ml-12 text-xs text-gray-500">No follow up discussions.</p>
                            )}

                            {areChildrenShown && replies.length > 0 && (
                                <div className="ml-10 flex flex-col gap-3 border-l pl-3">
                                    {replies.map((reply) => (
                                        <div key={reply.id} className="flex flex-col gap-2">
                                            <DiscussionItem
                                                discussion={reply}
                                                profile={profilesByUserId[reply.userId]}
                                                repliedProfile={reply.repliedId ? profilesByUserId[findRepliedUserId(reply.repliedId, allDiscussions)] : undefined}
                                                isOwner={ownerByDiscussionId[reply.id]}
                                                isEditing={editingDiscussionId === reply.id}
                                                editText={editText}
                                                isSubmitting={isSubmitting}
                                                canReply={isLoggedIn}
                                                onReply={beginReply}
                                                onEdit={beginEdit}
                                                onEditTextChange={setEditText}
                                                onCancelEdit={cancelEdit}
                                                onUpdate={updateDiscussion}
                                                onDelete={deleteDiscussion}
                                                onOpenProfile={openProfile}
                                                onRated={() => refreshDiscussion(reply.id)}
                                            />

                                            {replyingTo?.id === reply.id && (
                                                <ReplyForm
                                                    value={replyText}
                                                    isSubmitting={isSubmitting}
                                                    replyingTo={profilesByUserId[replyingTo.userId]}
                                                    onChange={setReplyText}
                                                    onCancel={() => setReplyingTo(null)}
                                                    onSubmit={() => submitComment(replyingTo.id)}
                                                />
                                            )}
                                        </div>
                                    ))}

                                    {hasMoreChildren && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="self-start text-gray-600"
                                            disabled={areChildrenLoading}
                                            onClick={() => loadChildrenDiscussions(comment.id, true)}
                                        >
                                            Load more follow ups
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                {hasMoreParents && (
                    <Button
                        type="button"
                        variant="outline"
                        className="self-center"
                        disabled={isLoadingMoreParents}
                        onClick={loadMoreParentDiscussions}
                    >
                        {isLoadingMoreParents ? "Loading..." : "Load more discussions"}
                    </Button>
                )}
            </div>
        </section>
    )
}

export default CommentSection;
