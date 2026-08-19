import {
    CopyObjectCommand,
    DeleteObjectCommand,
    DeleteObjectsCommand,
    GetObjectCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import path from 'path';
import { Readable } from 'stream';
import {
    StorageDownloadOptions,
    StorageService,
    StorageWriteOptions,
} from '../../application/ports/storage.service';

@Injectable()
export class S3StorageService implements StorageService {
    private readonly bucket: string;
    private readonly region: string;
    private readonly endpoint?: string;
    private readonly forcePathStyle: boolean;
    private readonly publicUrl?: string;
    private readonly keyPrefix: string;
    private readonly downloadUrlTtlSeconds: number;
    private readonly client: S3Client;

    constructor() {
        this.bucket = this.requiredEnvironmentVariable('STORAGE_BUCKET');
        this.region = process.env.STORAGE_REGION || process.env.AWS_REGION || 'us-east-1';
        const endpoint = process.env.STORAGE_ENDPOINT?.trim();
        const publicUrl = process.env.STORAGE_PUBLIC_URL?.trim();
        this.endpoint = endpoint ? endpoint.replace(/\/$/, '') : undefined;
        this.forcePathStyle = this.parseBoolean(process.env.STORAGE_FORCE_PATH_STYLE);
        this.publicUrl = publicUrl ? publicUrl.replace(/\/$/, '') : undefined;
        this.keyPrefix = this.normalizeKey(process.env.STORAGE_KEY_PREFIX || '');
        this.downloadUrlTtlSeconds = this.parseDownloadUrlTtl(process.env.STORAGE_DOWNLOAD_URL_TTL_SECONDS);
        this.client = new S3Client({
            region: this.region,
            endpoint: this.endpoint,
            forcePathStyle: this.forcePathStyle,
        });
    }

    async ensureDirectory(_key: string): Promise<void> {
        // S3 directories are virtual and are created automatically with object keys.
    }

    async deleteDirectory(key: string): Promise<void> {
        this.assertNonEmptyDirectoryKey(key);
        const keys = await this.listObjectKeys(this.toDirectoryKey(key));
        await this.deleteObjectKeys(keys);
    }

    async moveDirectory(sourceKey: string, destinationKey: string): Promise<void> {
        this.assertNonEmptyDirectoryKey(sourceKey);
        this.assertNonEmptyDirectoryKey(destinationKey);
        const sourcePrefix = this.toDirectoryKey(sourceKey);
        const destinationPrefix = this.toDirectoryKey(destinationKey);

        if (sourcePrefix === destinationPrefix) return;
        if (destinationPrefix.startsWith(sourcePrefix)) {
            throw new Error('Cannot move an S3 directory inside itself');
        }

        const sourceKeys = await this.listObjectKeys(sourcePrefix);

        for (let index = 0; index < sourceKeys.length; index += 20) {
            await Promise.all(
                sourceKeys.slice(index, index + 20).map((sourceObjectKey) => {
                    const destinationObjectKey = `${destinationPrefix}${sourceObjectKey.slice(sourcePrefix.length)}`;
                    return this.copyObject(sourceObjectKey, destinationObjectKey);
                }),
            );
        }

        await this.deleteObjectKeys(sourceKeys);
    }

    async writeFile(key: string, buffer: Buffer, options?: StorageWriteOptions): Promise<void> {
        await this.client.send(new PutObjectCommand({
            Bucket: this.bucket,
            Key: this.toObjectKey(key),
            Body: buffer,
            ContentType: options?.contentType,
            CacheControl: options?.cacheControl,
        }));
    }

    async deleteFile(key: string): Promise<void> {
        await this.client.send(new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: this.toObjectKey(key),
        }));
    }

    async moveFile(sourceKey: string, destinationKey: string): Promise<void> {
        const sourceObjectKey = this.toObjectKey(sourceKey);
        const destinationObjectKey = this.toObjectKey(destinationKey);

        if (sourceObjectKey === destinationObjectKey) return;

        await this.copyObject(sourceObjectKey, destinationObjectKey);
        await this.client.send(new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: sourceObjectKey,
        }));
    }

    async readFile(key: string): Promise<Readable> {
        const response = await this.client.send(new GetObjectCommand({
            Bucket: this.bucket,
            Key: this.toObjectKey(key),
        }));

        if (!response.Body) {
            throw new Error('S3 returned an empty file body');
        }

        return response.Body as Readable;
    }

    getPublicUrl(key: string): string {
        const objectKey = this.toObjectKey(key);
        const encodedKey = this.encodeObjectKey(objectKey);

        if (this.publicUrl) {
            return `${this.publicUrl}/${encodedKey}`;
        }

        if (this.endpoint && this.forcePathStyle) {
            return `${this.endpoint}/${this.bucket}/${encodedKey}`;
        }

        return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${encodedKey}`;
    }

    async getDownloadUrl(
        key: string,
        options?: StorageDownloadOptions,
    ): Promise<string> {
        return getSignedUrl(
            this.client,
            new GetObjectCommand({
                Bucket: this.bucket,
                Key: this.toObjectKey(key),
                ResponseContentDisposition: options?.downloadName
                    ? this.attachmentContentDisposition(options.downloadName)
                    : undefined,
            }),
            { expiresIn: this.downloadUrlTtlSeconds },
        );
    }

    private attachmentContentDisposition(fileName: string): string {
        const asciiFileName = fileName
            .normalize('NFKD')
            .replace(/[^\x20-\x7E]/g, '_')
            .replace(/["\\]/g, '_');
        const encodedFileName = encodeURIComponent(fileName).replace(
            /[!'()*]/g,
            (character) =>
                `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
        );

        return `attachment; filename="${asciiFileName || 'download'}"; filename*=UTF-8''${encodedFileName}`;
    }

    private async copyObject(sourceObjectKey: string, destinationObjectKey: string): Promise<void> {
        await this.client.send(new CopyObjectCommand({
            Bucket: this.bucket,
            CopySource: this.encodeObjectKey(`${this.bucket}/${sourceObjectKey}`),
            Key: destinationObjectKey,
        }));
    }

    private async listObjectKeys(prefix: string): Promise<string[]> {
        const keys: string[] = [];
        let continuationToken: string | undefined;

        do {
            const response = await this.client.send(new ListObjectsV2Command({
                Bucket: this.bucket,
                Prefix: prefix,
                ContinuationToken: continuationToken,
            }));

            keys.push(...(response.Contents ?? []).flatMap((object) => object.Key ? [object.Key] : []));
            continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
        } while (continuationToken);

        return keys;
    }

    private async deleteObjectKeys(keys: string[]): Promise<void> {
        for (let index = 0; index < keys.length; index += 1000) {
            const response = await this.client.send(new DeleteObjectsCommand({
                Bucket: this.bucket,
                Delete: {
                    Objects: keys.slice(index, index + 1000).map((Key) => ({ Key })),
                    Quiet: true,
                },
            }));

            if (response.Errors?.length) {
                throw new Error(`S3 failed to delete ${response.Errors.length} object(s)`);
            }
        }
    }

    private toObjectKey(key: string): string {
        const normalizedKey = this.normalizeKey(key);
        return this.keyPrefix ? path.posix.join(this.keyPrefix, normalizedKey) : normalizedKey;
    }

    private toDirectoryKey(key: string): string {
        const objectKey = this.toObjectKey(key);
        return objectKey ? `${objectKey.replace(/\/$/, '')}/` : '';
    }

    private normalizeKey(key: string): string {
        const normalizedKey = path.posix.normalize(key.replace(/\\/g, '/')).replace(/^\/+/, '');

        if (normalizedKey === '..' || normalizedKey.startsWith('../')) {
            throw new Error('Invalid storage key');
        }

        return normalizedKey === '.' ? '' : normalizedKey;
    }

    private encodeObjectKey(key: string): string {
        return key.split('/').map(encodeURIComponent).join('/');
    }

    private parseBoolean(value?: string): boolean {
        return value?.trim().toLowerCase() === 'true';
    }

    private parseDownloadUrlTtl(value?: string): number {
        const ttl = Number(value ?? 300);
        return Number.isInteger(ttl) && ttl >= 1 && ttl <= 604800 ? ttl : 300;
    }

    private assertNonEmptyDirectoryKey(key: string): void {
        if (!this.normalizeKey(key)) {
            throw new Error('Storage directory key cannot be empty');
        }
    }

    private requiredEnvironmentVariable(name: string): string {
        const value = process.env[name]?.trim();
        if (!value) throw new Error(`${name} is required when STORAGE_DRIVER=s3`);
        return value;
    }
}
