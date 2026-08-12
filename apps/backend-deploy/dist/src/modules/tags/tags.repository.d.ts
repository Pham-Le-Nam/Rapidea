export interface TagsRepository {
    ensure(names: readonly string[]): Promise<void>;
    list(): Promise<any[]>;
    listWithEmbeddings(): Promise<any[]>;
    replaceCourseTags(courseId: string, tags: any[], isSuggested: boolean): Promise<void>;
    replacePostTags(postId: string, tags: any[], isSuggested: boolean): Promise<void>;
    replaceFileTags(fileId: string, tags: any[], scores: Map<string, number>): Promise<void>;
    findFileTags(fileIds: string[]): Promise<any[]>;
    addFileTagsToPost(postId: string, fileTags: any[]): Promise<void>;
    createTranscript(fileId: string): Promise<any>;
    completeTranscript(fileId: string, text: string, language?: string, durationSec?: number): Promise<any>;
    failTranscript(fileId: string, error: string): Promise<any>;
    findByNames(names: string[]): Promise<any[]>;
    updateEmbeddings(tags: {
        id: string;
    }[], embeddings: number[][]): Promise<void>;
}
