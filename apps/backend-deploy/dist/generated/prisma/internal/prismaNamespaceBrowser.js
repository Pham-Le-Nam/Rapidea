"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.JsonNullValueInput = exports.NullableJsonNullValueInput = exports.SortOrder = exports.PhotoScalarFieldEnum = exports.FileInPostScalarFieldEnum = exports.FileInCourseScalarFieldEnum = exports.FileTagScalarFieldEnum = exports.PostTagScalarFieldEnum = exports.CourseTagScalarFieldEnum = exports.TagScalarFieldEnum = exports.FileTranscriptScalarFieldEnum = exports.FileScalarFieldEnum = exports.FolderScalarFieldEnum = exports.ProjectLinkScalarFieldEnum = exports.ProjectContributorScalarFieldEnum = exports.ProjectScalarFieldEnum = exports.EducationScalarFieldEnum = exports.ExperienceScalarFieldEnum = exports.RateDiscussionScalarFieldEnum = exports.DiscussionScalarFieldEnum = exports.RatePostScalarFieldEnum = exports.RecentPostViewScalarFieldEnum = exports.RecentCourseViewScalarFieldEnum = exports.PostScalarFieldEnum = exports.SubscribeScalarFieldEnum = exports.CourseScalarFieldEnum = exports.ChatMessageScalarFieldEnum = exports.ChatConversationScalarFieldEnum = exports.FollowScalarFieldEnum = exports.PasswordResetTokenScalarFieldEnum = exports.NotificationScalarFieldEnum = exports.PayoutAccountScalarFieldEnum = exports.EmailAuthTokenScalarFieldEnum = exports.OAuthAccountScalarFieldEnum = exports.SocialLinkScalarFieldEnum = exports.UsersScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    Users: 'Users',
    SocialLink: 'SocialLink',
    OAuthAccount: 'OAuthAccount',
    EmailAuthToken: 'EmailAuthToken',
    PayoutAccount: 'PayoutAccount',
    Notification: 'Notification',
    PasswordResetToken: 'PasswordResetToken',
    Follow: 'Follow',
    ChatConversation: 'ChatConversation',
    ChatMessage: 'ChatMessage',
    Course: 'Course',
    Subscribe: 'Subscribe',
    Post: 'Post',
    RecentCourseView: 'RecentCourseView',
    RecentPostView: 'RecentPostView',
    RatePost: 'RatePost',
    Discussion: 'Discussion',
    RateDiscussion: 'RateDiscussion',
    Experience: 'Experience',
    Education: 'Education',
    Project: 'Project',
    ProjectContributor: 'ProjectContributor',
    ProjectLink: 'ProjectLink',
    Folder: 'Folder',
    File: 'File',
    FileTranscript: 'FileTranscript',
    Tag: 'Tag',
    CourseTag: 'CourseTag',
    PostTag: 'PostTag',
    FileTag: 'FileTag',
    FileInCourse: 'FileInCourse',
    FileInPost: 'FileInPost',
    Photo: 'Photo'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UsersScalarFieldEnum = {
    id: 'id',
    email: 'email',
    password: 'password',
    firstname: 'firstname',
    lastname: 'lastname',
    middlename: 'middlename',
    username: 'username',
    avatarId: 'avatarId',
    backgroundId: 'backgroundId',
    headline: 'headline',
    bio: 'bio',
    postsCount: 'postsCount',
    coursesCount: 'coursesCount',
    followersCount: 'followersCount',
    followingCount: 'followingCount',
    subscribersCount: 'subscribersCount',
    ratingCount: 'ratingCount',
    ratingTotal: 'ratingTotal',
    rating: 'rating',
    sessionVersion: 'sessionVersion',
    role: 'role',
    isBanned: 'isBanned',
    bannedAt: 'bannedAt',
    banReason: 'banReason',
    creatorPrompt: 'creatorPrompt',
    createdAt: 'createdAt'
};
exports.SocialLinkScalarFieldEnum = {
    id: 'id',
    platform: 'platform',
    url: 'url',
    userId: 'userId',
    createdAt: 'createdAt'
};
exports.OAuthAccountScalarFieldEnum = {
    id: 'id',
    provider: 'provider',
    providerUserId: 'providerUserId',
    userId: 'userId',
    createdAt: 'createdAt'
};
exports.EmailAuthTokenScalarFieldEnum = {
    id: 'id',
    tokenHash: 'tokenHash',
    email: 'email',
    purpose: 'purpose',
    pendingUser: 'pendingUser',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
};
exports.PayoutAccountScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    accountHolderName: 'accountHolderName',
    country: 'country',
    currency: 'currency',
    payoutMethod: 'payoutMethod',
    bankName: 'bankName',
    routingNumber: 'routingNumber',
    accountNumber: 'accountNumber',
    paypalEmail: 'paypalEmail',
    taxResidency: 'taxResidency',
    businessType: 'businessType',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    actorId: 'actorId',
    type: 'type',
    title: 'title',
    message: 'message',
    link: 'link',
    readAt: 'readAt',
    createdAt: 'createdAt'
};
exports.PasswordResetTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    used: 'used',
    createdAt: 'createdAt'
};
exports.FollowScalarFieldEnum = {
    followerId: 'followerId',
    followingId: 'followingId',
    createdAt: 'createdAt'
};
exports.ChatConversationScalarFieldEnum = {
    id: 'id',
    userAId: 'userAId',
    userBId: 'userBId',
    lastMessageAt: 'lastMessageAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ChatMessageScalarFieldEnum = {
    id: 'id',
    conversationId: 'conversationId',
    senderId: 'senderId',
    text: 'text',
    readAt: 'readAt',
    createdAt: 'createdAt'
};
exports.CourseScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    userId: 'userId',
    price: 'price',
    currency: 'currency',
    thumbnailId: 'thumbnailId',
    folderId: 'folderId',
    subscribersCount: 'subscribersCount',
    postsCount: 'postsCount',
    ratingCount: 'ratingCount',
    ratingTotal: 'ratingTotal',
    rating: 'rating',
    createdAt: 'createdAt',
    lastUpdated: 'lastUpdated'
};
exports.SubscribeScalarFieldEnum = {
    id: 'id',
    courseId: 'courseId',
    userId: 'userId',
    review: 'review',
    rating: 'rating',
    price: 'price',
    currency: 'currency',
    paymentSessionId: 'paymentSessionId',
    createdAt: 'createdAt'
};
exports.PostScalarFieldEnum = {
    id: 'id',
    title: 'title',
    content: 'content',
    userId: 'userId',
    courseId: 'courseId',
    isPreview: 'isPreview',
    ratingCount: 'ratingCount',
    ratingTotal: 'ratingTotal',
    rating: 'rating',
    createdAt: 'createdAt',
    lastUpdated: 'lastUpdated'
};
exports.RecentCourseViewScalarFieldEnum = {
    id: 'id',
    courseId: 'courseId',
    userId: 'userId',
    viewedAt: 'viewedAt'
};
exports.RecentPostViewScalarFieldEnum = {
    id: 'id',
    postId: 'postId',
    userId: 'userId',
    viewedAt: 'viewedAt'
};
exports.RatePostScalarFieldEnum = {
    id: 'id',
    postId: 'postId',
    userId: 'userId',
    rating: 'rating',
    createdAt: 'createdAt'
};
exports.DiscussionScalarFieldEnum = {
    id: 'id',
    discussion: 'discussion',
    ratingCount: 'ratingCount',
    ratingTotal: 'ratingTotal',
    rating: 'rating',
    postId: 'postId',
    userId: 'userId',
    parentId: 'parentId',
    repliedId: 'repliedId',
    createdAt: 'createdAt'
};
exports.RateDiscussionScalarFieldEnum = {
    id: 'id',
    discussionId: 'discussionId',
    userId: 'userId',
    rating: 'rating',
    createdAt: 'createdAt'
};
exports.ExperienceScalarFieldEnum = {
    id: 'id',
    name: 'name',
    position: 'position',
    role: 'role',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    location: 'location',
    achievement: 'achievement',
    order: 'order',
    userId: 'userId',
    logoId: 'logoId',
    createdAt: 'createdAt'
};
exports.EducationScalarFieldEnum = {
    id: 'id',
    name: 'name',
    major: 'major',
    degree: 'degree',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    location: 'location',
    achievement: 'achievement',
    order: 'order',
    userId: 'userId',
    logoId: 'logoId',
    createdAt: 'createdAt'
};
exports.ProjectScalarFieldEnum = {
    id: 'id',
    name: 'name',
    role: 'role',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    details: 'details',
    order: 'order',
    userId: 'userId',
    logoId: 'logoId',
    createdAt: 'createdAt'
};
exports.ProjectContributorScalarFieldEnum = {
    projectId: 'projectId',
    userId: 'userId',
    role: 'role',
    createdAt: 'createdAt'
};
exports.ProjectLinkScalarFieldEnum = {
    id: 'id',
    projectId: 'projectId',
    name: 'name',
    url: 'url',
    createdAt: 'createdAt'
};
exports.FolderScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    name: 'name',
    parentId: 'parentId',
    createdAt: 'createdAt'
};
exports.FileScalarFieldEnum = {
    id: 'id',
    name: 'name',
    mimeType: 'mimeType',
    size: 'size',
    userId: 'userId',
    folderId: 'folderId',
    createdAt: 'createdAt',
    moderationStatus: 'moderationStatus',
    moderationScore: 'moderationScore',
    moderationCategories: 'moderationCategories',
    moderationMessage: 'moderationMessage'
};
exports.FileTranscriptScalarFieldEnum = {
    id: 'id',
    fileId: 'fileId',
    status: 'status',
    text: 'text',
    language: 'language',
    durationSec: 'durationSec',
    provider: 'provider',
    model: 'model',
    errorMessage: 'errorMessage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TagScalarFieldEnum = {
    id: 'id',
    name: 'name',
    embedding: 'embedding',
    createdAt: 'createdAt'
};
exports.CourseTagScalarFieldEnum = {
    courseId: 'courseId',
    tagId: 'tagId',
    isSuggested: 'isSuggested',
    score: 'score',
    createdAt: 'createdAt'
};
exports.PostTagScalarFieldEnum = {
    postId: 'postId',
    tagId: 'tagId',
    isSuggested: 'isSuggested',
    score: 'score',
    createdAt: 'createdAt'
};
exports.FileTagScalarFieldEnum = {
    fileId: 'fileId',
    tagId: 'tagId',
    isSuggested: 'isSuggested',
    score: 'score',
    createdAt: 'createdAt'
};
exports.FileInCourseScalarFieldEnum = {
    fileId: 'fileId',
    courseId: 'courseId',
    userId: 'userId',
    createdAt: 'createdAt'
};
exports.FileInPostScalarFieldEnum = {
    fileId: 'fileId',
    postId: 'postId',
    userId: 'userId',
    createdAt: 'createdAt'
};
exports.PhotoScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    url: 'url',
    name: 'name',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map