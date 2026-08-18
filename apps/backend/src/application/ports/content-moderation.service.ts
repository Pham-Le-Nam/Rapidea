export const CONTENT_MODERATION_SERVICE = 'CONTENT_MODERATION_SERVICE';

export type ModerationDecision = {
    status: 'PASSED' | 'WARNING' | 'SERIOUS_WARNING' | 'BLOCKED' | 'NOT_SCANNED';
    score: number | null;
    categories: string[];
    message: string | null;
};

export type ModerationFile = {
    originalname: string;
    mimetype: string;
    buffer: Buffer;
};

export interface ContentModerationService {
    moderate(file: ModerationFile, transcript?: string): Promise<ModerationDecision>;
}
