"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const folder_service_1 = require("../folder/folder.service");
const path_1 = __importDefault(require("path"));
const storage_constants_1 = require("../storage/storage.constants");
const tags_service_1 = require("../tags/tags.service");
const content_moderation_service_1 = require("./content-moderation.service");
const common_2 = require("@nestjs/common");
const notification_service_1 = require("../notification/notification.service");
let FileService = class FileService {
    fileRepo;
    folderService;
    storage;
    tagsService;
    moderation;
    notifications;
    constructor(fileRepo, folderService, storage, tagsService, moderation, notifications) {
        this.fileRepo = fileRepo;
        this.folderService = folderService;
        this.storage = storage;
        this.tagsService = tagsService;
        this.moderation = moderation;
        this.notifications = notifications;
    }
    async createFile(uploadedFile, userId, folderId) {
        const { originalname, mimetype, size, buffer } = uploadedFile;
        const isTranscribable = mimetype.startsWith('audio/') || mimetype.startsWith('video/');
        let transcriptText = '';
        if (isTranscribable && process.env.OPENAI_API_KEY) {
            try {
                transcriptText = await this.tagsService.transcribeMedia(uploadedFile);
            }
            catch {
            }
        }
        const moderation = await this.moderation.moderate(uploadedFile, transcriptText);
        if (moderation.status === 'BLOCKED') {
            throw new common_2.UnprocessableEntityException({
                message: moderation.message,
                moderation,
            });
        }
        const folderUrl = await this.folderService.getFolderUrl(folderId);
        const file = await this.fileRepo.create(folderId, originalname, mimetype, size, userId);
        await this.storage.writeFile(this.joinStorageKey(folderUrl, originalname), buffer);
        await this.fileRepo.updateModeration(file.id, moderation);
        await this.generateFileTags(file.id, uploadedFile, transcriptText);
        if (moderation.status === 'SERIOUS_WARNING') {
            await this.notifications.notifyAdminsOfModerationAlert(userId, file.id, originalname, moderation.message ?? 'Potentially prohibited content detected.');
        }
        return this.fileRepo.findById(file.id);
    }
    async deleteFile(fileId, userId) {
        const file = await this.fileRepo.deleteById(fileId, userId);
        if (!file) {
            throw new common_1.NotFoundException("", "File not found");
        }
        const folderUrl = await this.folderService.getFolderUrl(file.folderId);
        if (!folderUrl) {
            throw new common_1.InternalServerErrorException("", "Couldn't get folder URL");
        }
        await this.storage.deleteFile(this.joinStorageKey(folderUrl, file.name));
        return file;
    }
    async updateFile(fileId, userId, folderId, name) {
        const oldFile = await this.fileRepo.findById(fileId);
        const ext = path_1.default.extname(oldFile.name);
        const newFileName = name
            ? name.endsWith(ext)
                ? name
                : `${name}${ext}`
            : oldFile.name;
        const updatedFile = await this.fileRepo.updateById(fileId, userId, folderId, newFileName);
        const oldFolderUrl = await this.folderService.getFolderUrl(oldFile.folderId);
        const updatedFolderUrl = await this.folderService.getFolderUrl(updatedFile.folderId);
        if (!oldFolderUrl || !updatedFolderUrl) {
            throw new common_1.InternalServerErrorException("", "Couldn't update file");
        }
        await this.storage.moveFile(this.joinStorageKey(oldFolderUrl, oldFile.name), this.joinStorageKey(updatedFolderUrl, newFileName));
        return updatedFile;
    }
    async getFileById(fileId) {
        const file = await this.fileRepo.findById(fileId);
        if (!file) {
            throw new common_1.NotFoundException("", "File not found");
        }
        return file;
    }
    async getFileUrl(fileId) {
        const file = await this.fileRepo.findById(fileId);
        const folderUrl = await this.folderService.getFolderUrl(file.folderId);
        const fileUrl = this.storage.getPublicUrl(this.joinStorageKey(folderUrl, file.name));
        return fileUrl;
    }
    joinStorageKey(...parts) {
        return path_1.default.posix.join(...parts.map((part) => part.replace(/\\/g, '/')));
    }
    async generateFileTags(fileId, uploadedFile, existingTranscript = '') {
        const isTranscribable = uploadedFile.mimetype.startsWith('audio/') || uploadedFile.mimetype.startsWith('video/');
        let transcriptText = existingTranscript;
        if (isTranscribable) {
            await this.tagsService.createTranscript(fileId);
            try {
                if (!transcriptText)
                    transcriptText = await this.tagsService.transcribeMedia(uploadedFile);
                await this.tagsService.completeTranscript(fileId, transcriptText);
            }
            catch (error) {
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
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FILE_REPOSITORY')),
    __param(2, (0, common_1.Inject)(storage_constants_1.STORAGE_SERVICE)),
    __metadata("design:paramtypes", [Object, folder_service_1.FolderService, Object, tags_service_1.TagsService,
        content_moderation_service_1.ContentModerationService,
        notification_service_1.NotificationService])
], FileService);
//# sourceMappingURL=file.service.js.map