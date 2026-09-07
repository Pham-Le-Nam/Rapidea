import { ConflictException, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';

describe('UsersService instructor access', () => {
    const usersRepo = {
        findById: jest.fn(),
        findInstructorApplicationByUserId: jest.fn(),
        createInstructorApplication: jest.fn(),
        updateCreatorPrompt: jest.fn(),
    } as any;
    const folderService = {} as any;
    const notifications = { notifyAdminsOfInstructorApplication: jest.fn() } as any;
    const storage = { writeFile: jest.fn(), deleteFile: jest.fn() } as any;
    const service = new UsersService(usersRepo, folderService, notifications, storage);

    beforeEach(() => jest.resetAllMocks());

    it('rejects early reapplication before uploading a document', async () => {
        usersRepo.findById.mockResolvedValue({ id: 'learner-1', role: 'LEARNER' });
        usersRepo.findInstructorApplicationByUserId.mockResolvedValue({ status: 'DISAPPROVED', reviewedAt: new Date() });
        await expect(service.submitInstructorApplication('learner-1')).rejects.toBeInstanceOf(ConflictException);
        expect(storage.writeFile).not.toHaveBeenCalled();
        expect(usersRepo.createInstructorApplication).not.toHaveBeenCalled();
    });

    it('creates a fresh application after the wait instead of replacing history', async () => {
        usersRepo.findById.mockResolvedValue({ id: 'learner-1', username: 'learner', role: 'LEARNER' });
        usersRepo.findInstructorApplicationByUserId.mockResolvedValue({ id: 'old-application', status: 'DISAPPROVED', reviewedAt: new Date(Date.now() - 300001) });
        usersRepo.createInstructorApplication.mockResolvedValue({ id: 'new-application', status: 'PENDING' });
        const document = { originalname: 'new.pdf', mimetype: 'application/pdf', size: 12, buffer: Buffer.from('%PDF-1.7 test') } as Express.Multer.File;
        await expect(service.submitInstructorApplication('learner-1', document)).resolves.toMatchObject({ id: 'new-application', status: 'PENDING' });
        expect(notifications.notifyAdminsOfInstructorApplication).toHaveBeenCalledWith('learner-1', 'new-application', 'learner');
    });

    it('submits a valid learner application and notifies administrators', async () => {
        usersRepo.findById.mockResolvedValue({ id: 'learner-1', username: 'new.learner', role: 'LEARNER' });
        usersRepo.findInstructorApplicationByUserId.mockResolvedValue(null);
        usersRepo.createInstructorApplication.mockResolvedValue({ id: 'application-1', status: 'PENDING' });
        storage.writeFile.mockResolvedValue(undefined);
        notifications.notifyAdminsOfInstructorApplication.mockResolvedValue({ count: 2 });
        const idDocument = {
            originalname: 'identity.pdf',
            mimetype: 'application/pdf',
            size: 12,
            buffer: Buffer.from('%PDF-1.7 test'),
        } as Express.Multer.File;

        await expect(service.submitInstructorApplication('learner-1', idDocument)).resolves.toMatchObject({
            id: 'application-1',
            status: 'PENDING',
        });
        expect(storage.writeFile).toHaveBeenCalledWith(
            expect.stringMatching(/^private\/instructor-verification\/learner-1\/.+\.pdf$/),
            idDocument.buffer,
            { contentType: 'application/pdf' },
        );
        expect(notifications.notifyAdminsOfInstructorApplication).toHaveBeenCalledWith(
            'learner-1',
            'application-1',
            'new.learner',
        );
    });

    it('does not allow a learner to update creator-only preferences', async () => {
        usersRepo.findById.mockResolvedValue({ id: 'learner-1', role: 'LEARNER' });

        await expect(service.updateCreatorPrompt('learner-1', 'prompt')).rejects.toBeInstanceOf(ForbiddenException);
        expect(usersRepo.updateCreatorPrompt).not.toHaveBeenCalled();
    });
});
