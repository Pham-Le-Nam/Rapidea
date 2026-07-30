import { Controller, Post, Get, Put, Body, Query, Redirect, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './auth-dto/register.dto';
import { LoginDto } from './auth-dto/login.dto';
import { ChangePasswordDto } from './auth-dto/change-password.dto';
import { ResetPasswordDto } from './auth-dto/reset-password.dto';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(
        @Body() registerDto: RegisterDto
    ) {
        return this.authService.register(registerDto.email, registerDto.password, registerDto.confirmPassword, registerDto.firstname, registerDto.lastname, registerDto.middlename);
    }

    @Post('login')
    async login(
        @Body() loginDto: LoginDto
    ) {
        return this.authService.login(loginDto.email, loginDto.password);
    }

    @Get('email/verify')
    async verifyEmail(@Query('token') token: string) {
        return this.authService.verifyEmailToken(token);
    }

    @Get('oauth/google')
    @Redirect()
    google() {
        return { url: this.authService.getGoogleAuthorizationUrl(), statusCode: 302 };
    }

    @Get('oauth/google/callback')
    async googleCallback(@Query('code') code: string, @Query('state') state: string, @Res() response: Response) {
        const session = await this.authService.finishGoogleOAuth(code, state);
        return response.redirect(this.authService.getFrontendCallbackUrl(session.access_token));
    }

    @Post('reset-password')
    async changePassoword(
        @Body() changePassowordDto: ChangePasswordDto
    ) {
        return this.authService.changePassword(changePassowordDto.email);
    }

    @Get('reset-password')
    async verifyToken(
        @Query('token') token: string,
    ) {
        return this.authService.checkResetToken(token);
    }

    @Put('reset-password')
    async resetPassword( 
        @Body() resetPasswordDto: ResetPasswordDto
    ) {
        return this.authService.resetPassword(resetPasswordDto.password, resetPasswordDto.confirmPassword, resetPasswordDto.token);
    }
}
