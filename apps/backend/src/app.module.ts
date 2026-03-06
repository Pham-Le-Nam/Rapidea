import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { FollowersModule } from './modules/followers/followers.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { PasswordResetTokenModule } from './modules/password-reset-token/password-reset-token.module';
import { FollowModule } from './modules/follow/follow.module';
import { CourseModule } from './modules/course/course.module';
import { SubscribeModule } from './modules/subscribe/subscribe.module';
import { PostModule } from './modules/post/post.module';
import { InCourseModule } from './modules/post-in-course/post-in-course.module';
import { RatePostModule } from './modules/rate-post/rate-post.module';
import { DiscussionModule } from './modules/discussion/discussion.module';
import { ReplyDiscussionModule } from './modules/reply-discussion/reply-discussion.module';
import { RateDiscussionModule } from './modules/rate-discussion/rate-discussion.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { EducationModule } from './modules/education/education.module';
import { ProjectModule } from './modules/project/project.module';
import { ProjectContributorModule } from './modules/project-contributor/project-contributor.module';
import { ProjectLinkModule } from './modules/project-link/project-link.module';
import { FolderModule } from './modules/folder/folder.module';
import { FolderInCourseModule } from './modules/folder-in-course/folder-in-course.module';
import { FileModule } from './modules/file/file.module';
import { FileInCourseModule } from './modules/file-in-course/file-in-course.module';
import { FileInPostModule } from './modules/file-in-post/file-in-post.module';
import { PhotoModule } from './modules/photo/photo.module';
import { SocialLinkModule } from './modules/social-link/social-link.module';

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
    InCourseModule,
    RatePostModule,
    DiscussionModule,
    ReplyDiscussionModule,
    RateDiscussionModule,
    ExperienceModule,
    EducationModule,
    ProjectModule,
    ProjectContributorModule,
    ProjectLinkModule,
    FolderModule,
    FolderInCourseModule,
    FileModule,
    FileInCourseModule,
    FileInPostModule,
    PhotoModule,
    SocialLinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}