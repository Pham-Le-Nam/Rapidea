import { RequestTimeoutException } from '@nestjs/common';
import { AuthService } from './auth.service';

describe('AuthService email registration', () => {
    const usersService = {
        getUserByEmail: jest.fn(),
        createUser: jest.fn(),
        updateSessionVersion: jest.fn(),
    };
    const authenticationProvider = {
        createSessionToken: jest.fn(),
    };
    const mailService = {
        sendRegistrationVerification: jest.fn(),
        sendPasswordReset: jest.fn(),
    };
    const passwordResetTokenService = {};
    const authRepo = {
        replaceRegistrationToken: jest.fn(),
        findEmailToken: jest.fn(),
        consumeEmailToken: jest.fn(),
    };

    let service: AuthService;

    beforeEach(() => {
        jest.clearAllMocks();
        service = new AuthService(
            usersService as any,
            authenticationProvider as any,
            mailService,
            passwordResetTokenService as any,
            authRepo as any,
        );
    });

    it('emails a verification link without creating a user', async () => {
        usersService.getUserByEmail.mockResolvedValue(null);
        authRepo.replaceRegistrationToken.mockResolvedValue(undefined);
        mailService.sendRegistrationVerification.mockResolvedValue(undefined);

        await expect(service.register(
            ' Person@Example.com ',
            'password',
            'password',
            'First',
            'Last',
        )).resolves.toEqual({
            success_message: 'Check your inbox to verify your email and finish creating your account.',
        });

        expect(authRepo.replaceRegistrationToken).toHaveBeenCalledWith(
            'person@example.com',
            expect.any(String),
            expect.objectContaining({
                password: expect.any(String),
                firstname: 'First',
                lastname: 'Last',
            }),
            expect.any(Date),
        );
        expect(mailService.sendRegistrationVerification).toHaveBeenCalledWith(
            'person@example.com',
            expect.any(String),
        );
        expect(usersService.createUser).not.toHaveBeenCalled();
    });

    it('does not create a user when email delivery fails', async () => {
        usersService.getUserByEmail.mockResolvedValue(null);
        authRepo.replaceRegistrationToken.mockResolvedValue(undefined);
        mailService.sendRegistrationVerification.mockRejectedValue(new Error('SMTP unavailable'));

        await expect(service.register(
            'person@example.com',
            'password',
            'password',
            'First',
            'Last',
        )).rejects.toThrow('SMTP unavailable');

        expect(usersService.createUser).not.toHaveBeenCalled();
    });

    it('creates the user only after a valid verification token is submitted', async () => {
        const pendingUser = {
            password: 'hashed-password',
            firstname: 'First',
            lastname: 'Last',
        };
        authRepo.findEmailToken.mockResolvedValue({
            id: 'verification-id',
            email: 'person@example.com',
            purpose: 'REGISTER',
            pendingUser,
            expiresAt: new Date(Date.now() + 60_000),
            usedAt: null,
        });
        usersService.getUserByEmail.mockResolvedValue(null);
        usersService.createUser.mockResolvedValue({ id: 'user-id' });
        authRepo.consumeEmailToken.mockResolvedValue(true);
        usersService.updateSessionVersion.mockResolvedValue({
            id: 'user-id',
            email: 'person@example.com',
            sessionVersion: 1,
        });
        authenticationProvider.createSessionToken.mockReturnValue('session-token');

        await expect(service.verifyEmailToken('raw-token')).resolves.toEqual({
            access_token: 'session-token',
        });

        expect(usersService.createUser).toHaveBeenCalledWith(
            'person@example.com',
            'hashed-password',
            'First',
            'Last',
            undefined,
        );
    });

    it('does not create a user for an invalid verification token', async () => {
        authRepo.findEmailToken.mockResolvedValue(null);

        await expect(service.verifyEmailToken('invalid-token'))
            .rejects.toBeInstanceOf(RequestTimeoutException);

        expect(usersService.createUser).not.toHaveBeenCalled();
    });
});
