export enum AiChatTrustedSourceType {
    COURSE = 'COURSE',
    POST = 'POST',
    FILE = 'FILE',
}

export type AddAiChatTrustedSource = {
    sourceType: AiChatTrustedSourceType;
    sourceId: string;
};
