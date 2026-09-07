import { BadRequestException, ConflictException, ForbiddenException, Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';
import path from 'path';
import { UsersRepository } from '../../domain/users/repositories/users.repository';
import { FolderService } from '../folder/folder.service';
import { NotificationService } from '../notification/notification.service';
import { STORAGE_SERVICE, StorageService } from '../ports/storage.service';

const INSTRUCTOR_ID_MIME_TYPES: Record<string, string> = {
    'application/pdf': '.pdf',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
};

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private readonly usersRepo: UsersRepository,
        private folderService: FolderService,
        private readonly notifications: NotificationService,
        @Inject(STORAGE_SERVICE) private readonly storage: StorageService,
    ) {}

    async createUser(email: string, password: string | null, firstname: string, lastname: string, middlename?: string) {
        const user = await this.usersRepo.create( email, password, firstname, lastname, middlename );

        if (!user) { 
            throw new InternalServerErrorException("Couldn't create user");
        }

        const accountRootFolder = await this.folderService.createFolder(user.id, user.username);
        const accountFreeFolder = await this.folderService.createFolder(user.id, "free", accountRootFolder.id);

        if (!accountRootFolder || !accountFreeFolder) {
            throw new InternalServerErrorException("Couldn't create folders");
        }

        return user;
    }

    async getUsers() {
        return this.usersRepo.findAll();
    }

    async getUserByEmail(email: string) {
        return this.usersRepo.findByEmail(email);
    }

    async getUserByUsername(username: string) {
        return this.usersRepo.findByUsername(username);
    }

    async getUserById(id: string) {
        return this.usersRepo.findById(id);
    }

    async updateSessionVersion(id: string) {
        return this.usersRepo.updateSessionVersion(id);
    }

    async validateSessionVersion(id: string, sessionVersion: number) {
        return this.usersRepo.validateSessionVersion(id, sessionVersion);
    }

    async resetPassword(id: string, password: string) {
        return this.usersRepo.resetPassword(id, password);
    }

    async updateCreatorPrompt(userId: string, creatorPrompt: string) {
        await this.assertCreator(userId);
        return this.usersRepo.updateCreatorPrompt(userId, creatorPrompt);
    }

    async getPayoutAccount(userId: string) {
        await this.assertCreator(userId);
        return this.usersRepo.findPayoutAccountByUserId(userId);
    }

    async updatePayoutAccount(userId: string, data: any) {
        await this.assertCreator(userId);
        const cleanedData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
                key,
                typeof value === 'string' ? value.trim() : value,
            ]),
        );
        const isReadyForReview = !!cleanedData.accountHolderName
            && !!cleanedData.country
            && !!cleanedData.currency
            && (
                cleanedData.payoutMethod === 'PAYPAL'
                    ? !!cleanedData.paypalEmail
                    : !!cleanedData.bankName && !!cleanedData.routingNumber && !!cleanedData.accountNumber
            );

        return this.usersRepo.upsertPayoutAccount(userId, {
            ...cleanedData,
            status: isReadyForReview ? 'READY_FOR_REVIEW' : 'DRAFT',
        });
    }

    async getInstructorApplication(userId: string) {
        return this.usersRepo.findInstructorApplicationByUserId(userId);
    }

    async submitInstructorApplication(userId: string, idDocument?: Express.Multer.File) {
        const user = await this.usersRepo.findById(userId);
        if (!user) throw new BadRequestException('User not found');
        if (user.role !== 'LEARNER') {
            throw new ConflictException('This account already has instructor access');
        }

        const currentApplication = await this.usersRepo.findInstructorApplicationByUserId(userId);
        if (currentApplication) {
            throw new ConflictException('An instructor application has already been submitted');
        }
        if (!idDocument) throw new BadRequestException('An identity document is required');
        if (!INSTRUCTOR_ID_MIME_TYPES[idDocument.mimetype]) {
            throw new BadRequestException('Upload a PDF, JPG, PNG, or WebP identity document');
        }
        if (!this.hasValidDocumentSignature(idDocument)) {
            throw new BadRequestException('The identity document content does not match its file type');
        }
        if (idDocument.size > 10 * 1024 * 1024) {
            throw new BadRequestException('Identity document must be 10 MB or smaller');
        }

        const documentKey = path.posix.join(
            'private',
            'instructor-verification',
            userId,
            `${crypto.randomUUID()}${INSTRUCTOR_ID_MIME_TYPES[idDocument.mimetype]}`,
        );
        await this.storage.writeFile(documentKey, idDocument.buffer, { contentType: idDocument.mimetype });

        try {
            const application = await this.usersRepo.createInstructorApplication(userId, {
                key: documentKey,
                name: idDocument.originalname,
                mimeType: idDocument.mimetype,
            });
            await this.notifications.notifyAdminsOfInstructorApplication(
                userId,
                application.id,
                user.username,
            );
            return application;
        } catch (error) {
            await this.storage.deleteFile(documentKey).catch(() => undefined);
            throw error;
        }
    }

    private async assertCreator(userId: string) {
        const user = await this.usersRepo.findById(userId);
        if (!user || !['INSTRUCTOR', 'ADMIN'].includes(user.role)) {
            throw new ForbiddenException('Instructor access is required');
        }
    }

    async updateProfileById(id: string, firstname?: string, lastname? : string, middlename? : string, avatarId?: number | null, backgroundId?: number | null, headline?: string, bio?: string) {
        return this.usersRepo.updateById(id, firstname, lastname, middlename, avatarId, backgroundId, headline, bio);
    }

    async updateProfileByUsername(currentUsername: string, firstname?: string, lastname? : string, middlename? : string, avatarId?: number | null, backgroundId?: number | null, headline?: string, bio?: string) {
        const currentUser = await this.usersRepo.findByUsername(currentUsername);
        const updatedUser = await this.usersRepo.updateByUsername(currentUsername, firstname, lastname, middlename, avatarId, backgroundId, headline, bio);

        if (currentUser && updatedUser?.username && updatedUser.username !== currentUsername) {
            const rootFolder = await this.folderService.findFolderByLocation(currentUsername);

            if (rootFolder) {
                await this.folderService.renameFolder(rootFolder.id, currentUser.id, updatedUser.username);
            }
        }

        return updatedUser;
    }

    private hasValidDocumentSignature(file: Express.Multer.File) {
        const bytes = file.buffer;
        if (file.mimetype === 'application/pdf') return bytes.subarray(0, 5).toString() === '%PDF-';
        if (file.mimetype === 'image/jpeg') return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
        if (file.mimetype === 'image/png') return bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
        if (file.mimetype === 'image/webp') {
            return bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP';
        }
        return false;
    }
}
