import { Injectable } from '@nestjs/common';
import { mkdir, rename, rm, writeFile } from 'fs/promises';
import path from 'path';
import { StorageService, StorageWriteOptions } from './storage.service';

@Injectable()
export class LocalStorageService implements StorageService {
    private readonly root = process.env.STORAGE_ROOT || process.env.STORAGE_URL || 'storage';
    private readonly publicUrl = process.env.STORAGE_PUBLIC_URL;
    private readonly publicPath = process.env.STORAGE_PUBLIC_PATH || process.env.STORAGE_URL || 'storage';

    async ensureDirectory(key: string): Promise<void> {
        await mkdir(this.resolvePath(key), { recursive: true });
    }

    async deleteDirectory(key: string): Promise<void> {
        this.assertNonEmptyDirectoryKey(key);
        await rm(this.resolvePath(key), {
            recursive: true,
            force: true,
        });
    }

    async moveDirectory(sourceKey: string, destinationKey: string): Promise<void> {
        this.assertNonEmptyDirectoryKey(sourceKey);
        this.assertNonEmptyDirectoryKey(destinationKey);
        await mkdir(path.dirname(this.resolvePath(destinationKey)), { recursive: true });
        await rename(this.resolvePath(sourceKey), this.resolvePath(destinationKey));
    }

    async writeFile(key: string, buffer: Buffer, _options?: StorageWriteOptions): Promise<void> {
        const filePath = this.resolvePath(key);

        await mkdir(path.dirname(filePath), { recursive: true });
        await writeFile(filePath, buffer);
    }

    async deleteFile(key: string): Promise<void> {
        await rm(this.resolvePath(key), { force: true });
    }

    async moveFile(sourceKey: string, destinationKey: string): Promise<void> {
        const destinationPath = this.resolvePath(destinationKey);

        await mkdir(path.dirname(destinationPath), { recursive: true });
        await rename(this.resolvePath(sourceKey), destinationPath);
    }

    getPublicUrl(key: string): string {
        const normalizedKey = this.normalizeKey(key);

        if (!this.publicUrl) {
            return `/${path.posix.join(this.normalizeKey(this.publicPath), normalizedKey)}`;
        }

        return `${this.publicUrl.replace(/\/$/, '')}/${normalizedKey}`;
    }

    async getDownloadUrl(key: string): Promise<string> {
        return this.getPublicUrl(key);
    }

    private resolvePath(key: string): string {
        const rootPath = path.resolve(this.root);
        const targetPath = path.resolve(rootPath, this.normalizeKey(key));

        if (targetPath !== rootPath && !targetPath.startsWith(`${rootPath}${path.sep}`)) {
            throw new Error('Invalid storage key');
        }

        return targetPath;
    }

    private normalizeKey(key: string): string {
        const normalizedKey = path.posix.normalize(key.replace(/\\/g, '/')).replace(/^\/+/, '');

        if (normalizedKey === '..' || normalizedKey.startsWith('../')) {
            throw new Error('Invalid storage key');
        }

        return normalizedKey === '.' ? '' : normalizedKey;
    }

    private assertNonEmptyDirectoryKey(key: string): void {
        if (!this.normalizeKey(key)) {
            throw new Error('Storage directory key cannot be empty');
        }
    }
}
