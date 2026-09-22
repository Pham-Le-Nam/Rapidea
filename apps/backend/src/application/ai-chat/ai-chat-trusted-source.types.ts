export enum AiChatTrustedSourceType {
    COURSE = 'COURSE',
    POST = 'POST',
    FILE = 'FILE',
}

export type AiChatTrustedSourceInput = {
    sourceType: AiChatTrustedSourceType;
    sourceId: string;
};

export type AiChatTrustedSourceCreateData =
    | { courseId: string }
    | { postId: string }
    | { fileId: string };
