import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import {
    AuthenticationProviderService as AuthenticationProviderPort,
    OAuthProfile,
} from '../../application/ports/authentication-provider.service';

@Injectable()
export class AuthenticationProviderService implements AuthenticationProviderPort {
    constructor(
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
    ) {}

    createSessionToken(payload: { sub: string; email: string; sessionVersion: number }) {
        return this.jwtService.sign(payload);
    }

    getGoogleAuthorizationUrl() {
        const state = this.jwtService.sign(
            { provider: 'google', nonce: crypto.randomBytes(16).toString('hex') },
            { expiresIn: '10m' },
        );
        const query = new URLSearchParams({
            client_id: this.required('GOOGLE_CLIENT_ID'),
            redirect_uri: this.oauthCallback('google'),
            response_type: 'code',
            scope: 'openid email profile',
            state,
            prompt: 'select_account',
        });

        return `https://accounts.google.com/o/oauth2/v2/auth?${query}`;
    }

    async getGoogleProfile(code: string, state: string): Promise<OAuthProfile> {
        this.verifyOAuthState(state, 'google');

        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: this.required('GOOGLE_CLIENT_ID'),
                client_secret: this.required('GOOGLE_CLIENT_SECRET'),
                redirect_uri: this.oauthCallback('google'),
                grant_type: 'authorization_code',
            }),
        });
        if (!response.ok) throw new UnauthorizedException('Google sign-in could not be completed.');

        const tokens = await response.json() as { access_token: string };
        const profileResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
            headers: { authorization: `Bearer ${tokens.access_token}` },
        });
        const profile = await profileResponse.json() as {
            sub: string;
            email: string;
            email_verified: boolean;
            given_name?: string;
            family_name?: string;
        };
        if (!profileResponse.ok || !profile.email_verified) {
            throw new UnauthorizedException('Google did not provide a verified email.');
        }

        return {
            providerUserId: profile.sub,
            email: profile.email,
            firstname: profile.given_name,
            lastname: profile.family_name,
        };
    }

    getFrontendCallbackUrl(accessToken: string) {
        const frontend = this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:5173';
        return `${frontend}/auth/callback#token=${encodeURIComponent(accessToken)}`;
    }

    private required(name: string) {
        const value = this.config.get<string>(name);
        if (!value) throw new InternalServerErrorException(`${name} is not configured`);
        return value;
    }

    private oauthCallback(provider: string) {
        const backend = this.config.get<string>('BACKEND_URL')
            ?? `http://localhost:${this.config.get('API_PORT') ?? 1234}`;
        return `${backend}/api/auth/oauth/${provider}/callback`;
    }

    private verifyOAuthState(state: string, provider: string) {
        try {
            const payload = this.jwtService.verify(state) as { provider: string };
            if (payload.provider !== provider) throw new Error();
        } catch {
            throw new UnauthorizedException('OAuth state is invalid or expired.');
        }
    }
}
