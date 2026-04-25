export type CommentProps = {
    className?: string;
    user?: any;
    post: any;
    onCommentCountChange?: () => void;
}

export type Discussion = {
    id: string;
    discussion: any;
    rating?: number;
    postId: string;
    userId: string;
    parentId?: string | null;
    repliedId?: string | null;
    createdAt: string;
}

export type Profile = {
    firstname?: string;
    middlename?: string;
    lastname?: string;
    username?: string;
    avatarUrl?: string;
}
