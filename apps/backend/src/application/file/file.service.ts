import { 
    ForbiddenException,
    Injectable, 
    Inject, 
    InternalServerErrorException, 
    NotFoundException 
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { FileRepository } from '../../domain/file/repositories/file.repository';
import { FolderService } from '../folder/folder.service';
import path from 'path';
import { STORAGE_SERVICE, StorageService } from '../ports/storage.service';
import { TagsService } from '../tags/tags.service';
import {
    CONTENT_MODERATION_SERVICE,
    ContentModerationService,
} from '../ports/content-moderation.service';
import { UnprocessableEntityException } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';

const OFFICE_PREVIEW_EXTENSIONS = new Set([
    '.doc',
    '.docx',
    '.docm',
    '.dot',
    '.dotx',
    '.dotm',
    '.odt',
    '.xls',
    '.xlsx',
    '.xlsm',
    '.xlm',
    '.xlsb',
    '.ods',
    '.one',
    '.ppt',
    '.pptx',
    '.pps',
    '.ppsx',
    '.pot',
    '.potx',
    '.pptm',
    '.potm',
    '.ppsm',
    '.odp',
]);

@Injectable()
export class FileService {
    constructor (
        @Inject('FILE_REPOSITORY')
        private readonly fileRepo: FileRepository,
        private readonly folderService: FolderService,
        @Inject(STORAGE_SERVICE)
        private readonly storage: StorageService,
        private readonly tagsService: TagsService,
        @Inject(CONTENT_MODERATION_SERVICE)
        private readonly moderation: ContentModerationService,
        private readonly notifications: NotificationService,
        private readonly config: ConfigService,
    ) {}

    async createFile (uploadedFile: Express.Multer.File, userId: string, folderId: string) {
        const { originalname, mimetype, size, buffer } = uploadedFile;
        const isTranscribable = mimetype.startsWith('audio/') || mimetype.startsWith('video/');
        let transcriptText = '';
        if (isTranscribable) {
            try {
                transcriptText = await this.tagsService.transcribeMedia(uploadedFile);
            } catch {
                // The moderation result records that only available metadata was scanned.
            }
        }
        const moderation = await this.moderation.moderate(uploadedFile, transcriptText);
        if (moderation.status === 'BLOCKED') {
            throw new UnprocessableEntityException({
                message: moderation.message,
                moderation,
            });
        }

        // Check if folder exist then get its url
        const folderUrl = await this.folderService.getFolderUrl(folderId);
        // Add a file value into the database
        const file = await this.fileRepo.create(folderId, originalname, mimetype, size, userId);

        await this.storage.writeFile(
            this.joinStorageKey(folderUrl, originalname),
            buffer,
            { contentType: mimetype },
        );
        await this.fileRepo.updateModeration(file.id, moderation);
        await this.generateFileTags(file.id, uploadedFile, transcriptText);
        if (moderation.status === 'SERIOUS_WARNING') {
            await this.notifications.notifyAdminsOfModerationAlert(
                userId,
                file.id,
                originalname,
                moderation.message ?? 'Potentially prohibited content detected.',
            );
        }

        return this.fileRepo.findById(file.id);
    }

    async deleteFile (fileId: string, userId: string) {
        const file = await this.fileRepo.deleteById(fileId, userId);

        if (!file) {
            throw new NotFoundException("","File not found");
        }

        const folderUrl = await this.folderService.getFolderUrl(file.folderId);

        if (!folderUrl) {
            throw new InternalServerErrorException("", "Couldn't get folder URL");
        }

        await this.storage.deleteFile(this.joinStorageKey(folderUrl, file.name));

        return file;
    }

    async updateFile (fileId: string, userId: string, folderId?: string, name?: string) {
        const oldFile = await this.fileRepo.findById(fileId);

        const ext = path.extname(oldFile.name); // ".png", ".pdf", etc.

        const newFileName = name
            ? name.endsWith(ext)
            ? name
            : `${name}${ext}`
            : oldFile.name;

        const updatedFile = await this.fileRepo.updateById(fileId, userId, folderId, newFileName);

        const oldFolderUrl = await this.folderService.getFolderUrl(oldFile.folderId);
        const updatedFolderUrl = await this.folderService.getFolderUrl(updatedFile.folderId);

        if (!oldFolderUrl || !updatedFolderUrl) {
            throw new InternalServerErrorException("", "Couldn't update file");
        }

        await this.storage.moveFile(
            this.joinStorageKey(oldFolderUrl, oldFile.name),
            this.joinStorageKey(updatedFolderUrl, newFileName),
        );

        return updatedFile;
    }

    async getFileById (fileId: string) {
        const file = await this.fileRepo.findById(fileId);

        if (!file) {
            throw new NotFoundException("", "File not found");
        }
        
        return file;
    }

    async getFileUrl (fileId: string) {
        const file = await this.fileRepo.findById(fileId);

        if (!file) {
            throw new NotFoundException("", "File not found");
        }

        const folderUrl = await this.folderService.getFolderUrl(file.folderId);
        const fileUrl = await this.storage.getDownloadUrl(this.joinStorageKey(folderUrl, file.name));

        return fileUrl;
    }

    async getFileDownload (fileId: string) {
        const file = await this.fileRepo.findById(fileId);

        if (!file) {
            throw new NotFoundException("", "File not found");
        }

        const folderUrl = await this.folderService.getFolderUrl(file.folderId);

        return {
            file,
            stream: await this.storage.readFile(
                this.joinStorageKey(folderUrl, file.name),
            ),
        };
    }

    async createOfficePreviewUrl (fileId: string) {
        const file = await this.getFileById(fileId);

        const expiresAt = Math.floor(Date.now() / 1000) + this.officePreviewTtlSeconds();
        const signature = this.signOfficePreview(fileId, expiresAt);
        const query = new URLSearchParams({
            expires: String(expiresAt),
            signature,
        });

        return `api/file/office-preview/${encodeURIComponent(fileId)}/${encodeURIComponent(file.name)}?${query}`;
    }

    async getOfficePreview (
        fileId: string,
        expires: string,
        signature: string,
    ) {
        const expiresAt = Number(expires);

        if (!Number.isInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) {
            throw new ForbiddenException('Office preview URL has expired');
        }

        const expectedSignature = this.signOfficePreview(fileId, expiresAt);
        const signatureIsValid = /^[a-f\d]{64}$/i.test(signature) &&
            crypto.timingSafeEqual(
                Buffer.from(signature, 'hex'),
                Buffer.from(expectedSignature, 'hex'),
            );

        if (!signatureIsValid) {
            throw new ForbiddenException('Office preview signature is invalid');
        }

        const result = await this.getFileDownload(fileId);
        const canUseOfficeViewer = OFFICE_PREVIEW_EXTENSIONS.has(
            path.extname(result.file.name).toLowerCase(),
        );

        if (!canUseOfficeViewer) {
            result.stream.destroy();
            throw new NotFoundException('', 'Office preview file not found');
        }

        return result;
    }

    private joinStorageKey(...parts: string[]) {
        return path.posix.join(...parts.map((part) => part.replace(/\\/g, '/')));
    }

    private signOfficePreview(fileId: string, expiresAt: number): string {
        const signingKey = this.config.get<string>('JWT_SECRET_KEY');

        if (!signingKey) {
            throw new InternalServerErrorException('JWT_SECRET_KEY is not configured');
        }

        return crypto
            .createHmac('sha256', signingKey)
            .update(`office-preview:${fileId}:${expiresAt}`)
            .digest('hex');
    }

    private officePreviewTtlSeconds(): number {
        const configuredTtl = Number(
            this.config.get<string>('STORAGE_DOWNLOAD_URL_TTL_SECONDS') ?? 3600,
        );

        return Number.isInteger(configuredTtl) && configuredTtl >= 60 && configuredTtl <= 86400
            ? configuredTtl
            : 3600;
    }

    private async generateFileTags(fileId: string, uploadedFile: Express.Multer.File, existingTranscript = '') {
        const isTranscribable = uploadedFile.mimetype.startsWith('audio/') || uploadedFile.mimetype.startsWith('video/');
        let transcriptText = existingTranscript;

        if (isTranscribable) {
            await this.tagsService.createTranscript(fileId);

            try {
                if (!transcriptText) transcriptText = await this.tagsService.transcribeMedia(uploadedFile);
                await this.tagsService.completeTranscript(fileId, transcriptText);
            } catch (error: any) {
                await this.tagsService.failTranscript(fileId, error?.message ?? 'Transcription failed');
            }
        }

        const suggestionText = [
            uploadedFile.originalname,
            uploadedFile.mimetype,
            transcriptText,
        ].filter(Boolean).join('\n');
        const suggestions = await this.tagsService.suggestTags(suggestionText, 5);
        await this.tagsService.setFileSuggestedTags(fileId, suggestions);
    }
}
