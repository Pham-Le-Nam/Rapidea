"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./modules/users/users.module");
const followers_module_1 = require("./modules/followers/followers.module");
const auth_module_1 = require("./modules/auth/auth.module");
const mailer_1 = require("@nestjs-modules/mailer");
const config_2 = require("@nestjs/config");
const password_reset_token_module_1 = require("./modules/password-reset-token/password-reset-token.module");
const follow_module_1 = require("./modules/follow/follow.module");
const course_module_1 = require("./modules/course/course.module");
const subscribe_module_1 = require("./modules/subscribe/subscribe.module");
const post_module_1 = require("./modules/post/post.module");
const rate_post_module_1 = require("./modules/rate-post/rate-post.module");
const discussion_module_1 = require("./modules/discussion/discussion.module");
const rate_discussion_module_1 = require("./modules/rate-discussion/rate-discussion.module");
const experience_module_1 = require("./modules/experience/experience.module");
const education_module_1 = require("./modules/education/education.module");
const project_module_1 = require("./modules/project/project.module");
const project_contributor_module_1 = require("./modules/project-contributor/project-contributor.module");
const project_link_module_1 = require("./modules/project-link/project-link.module");
const folder_module_1 = require("./modules/folder/folder.module");
const file_module_1 = require("./modules/file/file.module");
const file_in_course_module_1 = require("./modules/file-in-course/file-in-course.module");
const file_in_post_module_1 = require("./modules/file-in-post/file-in-post.module");
const photo_module_1 = require("./modules/photo/photo.module");
const social_link_module_1 = require("./modules/social-link/social-link.module");
const recent_module_1 = require("./modules/recent/recent.module");
const search_module_1 = require("./modules/search/search.module");
const tags_module_1 = require("./modules/tags/tags.module");
const chat_module_1 = require("./modules/chat/chat.module");
const notification_module_1 = require("./modules/notification/notification.module");
const admin_module_1 = require("./modules/admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mailer_1.MailerModule.forRootAsync({
                inject: [config_2.ConfigService],
                useFactory: (config) => ({
                    transport: {
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        auth: {
                            user: config.get('MAIL_USER'),
                            pass: config.get('MAIL_PASSWORD'),
                        },
                    },
                }),
            }),
            users_module_1.UsersModule,
            followers_module_1.FollowersModule,
            auth_module_1.AuthModule,
            password_reset_token_module_1.PasswordResetTokenModule,
            follow_module_1.FollowModule,
            course_module_1.CourseModule,
            subscribe_module_1.SubscribeModule,
            post_module_1.PostModule,
            rate_post_module_1.RatePostModule,
            discussion_module_1.DiscussionModule,
            rate_discussion_module_1.RateDiscussionModule,
            experience_module_1.ExperienceModule,
            education_module_1.EducationModule,
            project_module_1.ProjectModule,
            project_contributor_module_1.ProjectContributorModule,
            project_link_module_1.ProjectLinkModule,
            folder_module_1.FolderModule,
            file_module_1.FileModule,
            file_in_course_module_1.FileInCourseModule,
            file_in_post_module_1.FileInPostModule,
            photo_module_1.PhotoModule,
            social_link_module_1.SocialLinkModule,
            recent_module_1.RecentModule,
            search_module_1.SearchModule,
            tags_module_1.TagsModule,
            chat_module_1.ChatModule,
            notification_module_1.NotificationModule,
            admin_module_1.AdminModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map