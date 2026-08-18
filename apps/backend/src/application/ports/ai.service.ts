export const AI_SERVICE = 'AI_SERVICE';

export type AiMediaFile = {
    originalname: string;
    mimetype: string;
    buffer: Buffer;
};

export interface AiService {
    generatePostContent(input: {
        target: 'title' | 'details';
        systemPrompt: string;
        context: string;
    }): Promise<string>;
    createEmbeddings(input: string[]): Promise<number[][] | null>;
    transcribeMedia(file: AiMediaFile): Promise<string>;
}
