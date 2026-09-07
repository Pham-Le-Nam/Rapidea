import { ExecutionContext, INestApplication, UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AdminController } from './admin.controller';
import { AdminService } from '../../../../application/admin/admin.service';
import { NotificationService } from '../../../../application/notification/notification.service';
import { STORAGE_SERVICE } from '../../../../application/ports/storage.service';
import { JwtAuthGuard } from '../../guards/auth/jwt.guard';

describe('Instructor application disapproval', () => {
    let app: INestApplication;
    const repository = { disapproveInstructorApplication: jest.fn(), findInstructorApplicationHistory: jest.fn() };
    const notifications = { createNotification: jest.fn() };
    const endpoint = '/api/admin/instructor-applications/application-1/disapprove';

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [AdminController],
            providers: [
                AdminService,
                { provide: 'ADMIN_REPOSITORY', useValue: repository },
                { provide: NotificationService, useValue: notifications },
                { provide: STORAGE_SERVICE, useValue: {} },
            ],
        }).overrideGuard(JwtAuthGuard).useValue({
            canActivate(context: ExecutionContext) {
                const req = context.switchToHttp().getRequest();
                const role = req.headers['x-test-role'];
                if (!role) throw new UnauthorizedException();
                req.user = { userId: 'reviewer-1', role };
                return true;
            },
        }).compile();
        app = module.createNestApplication();
        await app.init();
    });

    beforeEach(() => jest.resetAllMocks());
    afterAll(async () => { await app.close(); });

    it('requires authentication', async () => {
        await request(app.getHttpServer()).post(endpoint).expect(401);
        expect(repository.disapproveInstructorApplication).not.toHaveBeenCalled();
    });

    it('requires authentication to read history', async () => {
        await request(app.getHttpServer()).get('/api/admin/instructor-applications/history').expect(401);
        expect(repository.findInstructorApplicationHistory).not.toHaveBeenCalled();
    });

    it.each(['LEARNER', 'INSTRUCTOR'])('denies %s access to history', async (role) => {
        await request(app.getHttpServer()).get('/api/admin/instructor-applications/history').set('x-test-role', role).expect(403);
        expect(repository.findInstructorApplicationHistory).not.toHaveBeenCalled();
    });

    it('returns reviewed applications to administrators', async () => {
        const history = [{ id: 'application-1', applicantEmail: 'learner@example.com', reviewerEmail: 'admin@example.com', status: 'DISAPPROVED', submittedAt: '2026-09-01T00:00:00.000Z', reviewedAt: '2026-09-07T00:00:00.000Z', idDocumentName: 'identity.pdf' }];
        repository.findInstructorApplicationHistory.mockResolvedValue(history);
        const response = await request(app.getHttpServer()).get('/api/admin/instructor-applications/history').set('x-test-role', 'ADMIN').expect(200);
        expect(response.body).toEqual(history);
    });

    it.each(['LEARNER', 'INSTRUCTOR'])('denies %s access', async (role) => {
        await request(app.getHttpServer()).post(endpoint).set('x-test-role', role).expect(403);
        expect(repository.disapproveInstructorApplication).not.toHaveBeenCalled();
        expect(notifications.createNotification).not.toHaveBeenCalled();
    });

    it('records the administrator decision and notifies the applicant', async () => {
        repository.disapproveInstructorApplication.mockResolvedValue({
            id: 'application-1', userId: 'learner-1', status: 'DISAPPROVED',
        });
        const response = await request(app.getHttpServer()).post(endpoint).set('x-test-role', 'ADMIN').expect(201);
        expect(response.body.status).toBe('DISAPPROVED');
        expect(repository.disapproveInstructorApplication).toHaveBeenCalledWith('application-1', 'reviewer-1');
        expect(notifications.createNotification).toHaveBeenCalledWith(expect.objectContaining({
            userId: 'learner-1', actorId: 'reviewer-1', type: 'INSTRUCTOR_DISAPPROVED', link: '/settings',
        }));
    });

    it('rejects a missing or already reviewed application without sending a notification', async () => {
        repository.disapproveInstructorApplication.mockResolvedValue(null);
        await request(app.getHttpServer()).post(endpoint).set('x-test-role', 'ADMIN').expect(409);
        expect(notifications.createNotification).not.toHaveBeenCalled();
    });
});
