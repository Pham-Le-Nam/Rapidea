import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './auth-dto/register.dto';
import { LoginDto } from './auth-dto/login.dto';
import { ChangePasswordDto } from './auth-dto/change-password.dto';
import { ResetPasswordDto } from './auth-dto/reset-password.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        success_message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    verifyEmail(token: string): Promise<{
        access_token: string;
    }>;
    google(): {
        url: string;
        statusCode: number;
    };
    googleCallback(code: string, state: string, response: Response): Promise<void>;
    changePassoword(changePassowordDto: ChangePasswordDto): Promise<{
        success_message: string;
    }>;
    verifyToken(token: string): Promise<any>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        access_token: string;
    }>;
}
