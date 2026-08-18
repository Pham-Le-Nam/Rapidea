import { Module } from '@nestjs/common';
import { AppController } from '../../adapters/http/controllers/app/app.controller';
import { AppService } from '../../application/app/app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users.module';
import { FollowersModule } from './modules/followers.module';
import { AuthModule } from './modules/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { PasswordResetTokenModule } from './modules/password-reset-token.module';
import { FollowModule } from './modules/follow.module';
import { CourseModule } from './modules/course.module';
import { SubscribeModule } from './modules/subscribe.module';
import { PostModule } from './modules/post.module';
import { RatePostModule } from './modules/rate-post.module';
import { DiscussionModule } from './modules/discussion.module';
import { RateDiscussionModule } from './modules/rate-discussion.module';
import { ExperienceModule } from './modules/experience.module';
import { EducationModule } from './modules/education.module';
import { ProjectModule } from './modules/project.module';
import { ProjectContributorModule } from './modules/project-contributor.module';
import { ProjectLinkModule } from './modules/project-link.module';
import { FolderModule } from './modules/folder.module';
import { FileModule } from './modules/file.module';
import { FileInCourseModule } from './modules/file-in-course.module';
import { FileInPostModule } from './modules/file-in-post.module';
import { PhotoModule } from './modules/photo.module';
import { SocialLinkModule } from './modules/social-link.module';
import { RecentModule } from './modules/recent.module';
import { SearchModule } from './modules/search.module';
import { TagsModule } from './modules/tags.module';
import { ChatModule } from './modules/chat.module';
import { NotificationModule } from './modules/notification.module';
import { AdminModule } from './modules/admin.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: config.get<string>('MAIL_USER'),
                        pass: config.get<string>('MAIL_PASSWORD'),
                    },
                },
            }),
        }),
        UsersModule,
        FollowersModule,
        AuthModule,
        PasswordResetTokenModule,
        FollowModule,
        CourseModule,
        SubscribeModule,
        PostModule,
        RatePostModule,
        DiscussionModule,
        RateDiscussionModule,
        ExperienceModule,
        EducationModule,
        ProjectModule,
        ProjectContributorModule,
        ProjectLinkModule,
        FolderModule,
        // FolderInCourseModule,
        FileModule,
        FileInCourseModule,
        FileInPostModule,
        PhotoModule,
        SocialLinkModule,
        RecentModule,
        SearchModule,
        TagsModule,
        ChatModule,
        NotificationModule,
        AdminModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
