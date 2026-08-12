import { StorageService } from './storage.service';
export declare class LocalStorageService implements StorageService {
    private readonly root;
    private readonly publicUrl;
    ensureDirectory(key: string): Promise<void>;
    deleteDirectory(key: string): Promise<void>;
    moveDirectory(sourceKey: string, destinationKey: string): Promise<void>;
    writeFile(key: string, buffer: Buffer): Promise<void>;
    deleteFile(key: string): Promise<void>;
    moveFile(sourceKey: string, destinationKey: string): Promise<void>;
    getPublicUrl(key: string): string;
    private resolvePath;
    private normalizeKey;
}
