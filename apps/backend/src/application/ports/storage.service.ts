export const STORAGE_SERVICE = 'STORAGE_SERVICE';

export interface StorageWriteOptions {
    contentType?: string;
    cacheControl?: string;
}

export interface StorageService {
    ensureDirectory(key: string): Promise<void>;
    deleteDirectory(key: string): Promise<void>;
    moveDirectory(sourceKey: string, destinationKey: string): Promise<void>;
    writeFile(key: string, buffer: Buffer, options?: StorageWriteOptions): Promise<void>;
    deleteFile(key: string): Promise<void>;
    moveFile(sourceKey: string, destinationKey: string): Promise<void>;
    getPublicUrl(key: string): string;
    getDownloadUrl(key: string): Promise<string>;
}
