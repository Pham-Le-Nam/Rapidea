export declare const SocialPlatform: {
    readonly FACEBOOK: "FACEBOOK";
    readonly INSTAGRAM: "INSTAGRAM";
    readonly TWITTER: "TWITTER";
    readonly LINKEDIN: "LINKEDIN";
    readonly GITHUB: "GITHUB";
    readonly TIKTOK: "TIKTOK";
    readonly YOUTUBE: "YOUTUBE";
    readonly DISCORD: "DISCORD";
    readonly TELEGRAM: "TELEGRAM";
    readonly WEBSITE: "WEBSITE";
};
export type SocialPlatform = (typeof SocialPlatform)[keyof typeof SocialPlatform];
export declare const TranscriptStatus: {
    readonly NOT_REQUESTED: "NOT_REQUESTED";
    readonly PROCESSING: "PROCESSING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type TranscriptStatus = (typeof TranscriptStatus)[keyof typeof TranscriptStatus];
export declare const NotificationType: {
    readonly FOLLOW: "FOLLOW";
    readonly COURSE_SUBSCRIBE: "COURSE_SUBSCRIBE";
    readonly COURSE_REVIEW: "COURSE_REVIEW";
    readonly POST_RATE: "POST_RATE";
    readonly POST_DISCUSSION: "POST_DISCUSSION";
    readonly FOLLOWING_NEW_COURSE: "FOLLOWING_NEW_COURSE";
    readonly FOLLOWING_NEW_POST: "FOLLOWING_NEW_POST";
    readonly SUBSCRIBED_CREATOR_NEW_COURSE: "SUBSCRIBED_CREATOR_NEW_COURSE";
    readonly SUBSCRIBED_CREATOR_NEW_POST: "SUBSCRIBED_CREATOR_NEW_POST";
    readonly MODERATION_ALERT: "MODERATION_ALERT";
    readonly ADMIN_WARNING: "ADMIN_WARNING";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const AccountRole: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type AccountRole = (typeof AccountRole)[keyof typeof AccountRole];
export declare const ModerationStatus: {
    readonly PASSED: "PASSED";
    readonly WARNING: "WARNING";
    readonly SERIOUS_WARNING: "SERIOUS_WARNING";
    readonly BLOCKED: "BLOCKED";
    readonly NOT_SCANNED: "NOT_SCANNED";
};
export type ModerationStatus = (typeof ModerationStatus)[keyof typeof ModerationStatus];
