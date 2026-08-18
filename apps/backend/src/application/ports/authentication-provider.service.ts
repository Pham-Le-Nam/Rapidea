export const AUTHENTICATION_PROVIDER_SERVICE = 'AUTHENTICATION_PROVIDER_SERVICE';

export type OAuthProfile = {
    providerUserId: string;
    email: string;
    firstname?: string;
    lastname?: string;
};

export interface AuthenticationProviderService {
    createSessionToken(payload: { sub: string; email: string; sessionVersion: number }): string;
    getGoogleAuthorizationUrl(): string;
    getGoogleProfile(code: string, state: string): Promise<OAuthProfile>;
    getFrontendCallbackUrl(accessToken: string): string;
}
