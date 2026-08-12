"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationStatus = exports.AccountRole = exports.NotificationType = exports.TranscriptStatus = exports.SocialPlatform = void 0;
exports.SocialPlatform = {
    FACEBOOK: 'FACEBOOK',
    INSTAGRAM: 'INSTAGRAM',
    TWITTER: 'TWITTER',
    LINKEDIN: 'LINKEDIN',
    GITHUB: 'GITHUB',
    TIKTOK: 'TIKTOK',
    YOUTUBE: 'YOUTUBE',
    DISCORD: 'DISCORD',
    TELEGRAM: 'TELEGRAM',
    WEBSITE: 'WEBSITE'
};
exports.TranscriptStatus = {
    NOT_REQUESTED: 'NOT_REQUESTED',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED'
};
exports.NotificationType = {
    FOLLOW: 'FOLLOW',
    COURSE_SUBSCRIBE: 'COURSE_SUBSCRIBE',
    COURSE_REVIEW: 'COURSE_REVIEW',
    POST_RATE: 'POST_RATE',
    POST_DISCUSSION: 'POST_DISCUSSION',
    FOLLOWING_NEW_COURSE: 'FOLLOWING_NEW_COURSE',
    FOLLOWING_NEW_POST: 'FOLLOWING_NEW_POST',
    SUBSCRIBED_CREATOR_NEW_COURSE: 'SUBSCRIBED_CREATOR_NEW_COURSE',
    SUBSCRIBED_CREATOR_NEW_POST: 'SUBSCRIBED_CREATOR_NEW_POST',
    MODERATION_ALERT: 'MODERATION_ALERT',
    ADMIN_WARNING: 'ADMIN_WARNING'
};
exports.AccountRole = {
    USER: 'USER',
    ADMIN: 'ADMIN'
};
exports.ModerationStatus = {
    PASSED: 'PASSED',
    WARNING: 'WARNING',
    SERIOUS_WARNING: 'SERIOUS_WARNING',
    BLOCKED: 'BLOCKED',
    NOT_SCANNED: 'NOT_SCANNED'
};
//# sourceMappingURL=enums.js.map