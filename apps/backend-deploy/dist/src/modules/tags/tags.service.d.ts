import { TagsRepository } from './tags.repository';
type SuggestedTag = {
    id: string;
    name: string;
    score: number;
};
export declare class TagsService {
    private readonly tagsRepo;
    private readonly embeddingModel;
    private readonly openAiApiKey;
    constructor(tagsRepo: TagsRepository);
    ensureDefaultTags(): Promise<void>;
    listTags(): Promise<any[]>;
    suggestTags(text: string, limit?: number): Promise<SuggestedTag[]>;
    setCourseTags(courseId: string, tagNames: string[], isSuggested?: boolean): Promise<any[]>;
    setPostTags(postId: string, tagNames: string[], isSuggested?: boolean): Promise<any[]>;
    setFileSuggestedTags(fileId: string, suggestions: SuggestedTag[]): Promise<any[]>;
    addFileTagsToPost(postId: string, fileId: string): Promise<any[]>;
    getFileTagNames(fileIds: string[]): Promise<any[]>;
    createTranscript(fileId: string): Promise<any>;
    completeTranscript(fileId: string, text: string, language?: string, durationSec?: number): Promise<any>;
    failTranscript(fileId: string, errorMessage: string): Promise<any>;
    transcribeMedia(uploadedFile: Express.Multer.File): Promise<string>;
    private upsertTagsByName;
    private backfillTagEmbeddings;
    private createEmbedding;
    private createEmbeddings;
    private lexicalSuggestions;
    private lexicalScore;
    private cosineSimilarity;
    private normalizeText;
}
export {};
