export type ModerationDecision = {
    status: 'PASSED' | 'WARNING' | 'SERIOUS_WARNING' | 'BLOCKED' | 'NOT_SCANNED';
    score: number | null;
    categories: string[];
    message: string | null;
};
export declare class ContentModerationService {
    private readonly apiKey;
    moderate(file: Express.Multer.File, transcript?: string): Promise<ModerationDecision>;
    private extractText;
    private decision;
    private describeCategory;
}
