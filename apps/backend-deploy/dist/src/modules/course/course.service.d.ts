import { CourseRepository } from './course.repository';
import { FolderService } from '../folder/folder.service';
import { UsersService } from '../users/users.service';
import { TagsService } from '../tags/tags.service';
import { NotificationService } from '../notification/notification.service';
export declare class CourseService {
    private readonly courseRepo;
    private readonly folderService;
    private readonly usersService;
    private readonly tagsService;
    private readonly notificationService;
    constructor(courseRepo: CourseRepository, folderService: FolderService, usersService: UsersService, tagsService: TagsService, notificationService: NotificationService);
    createCourse(userId: string, title: string, description?: string, price?: number, currency?: string, tags?: string[]): Promise<any>;
    updateCourse(id: string, userId: string, title?: string, description?: string, price?: number, currency?: string, thumbnailId?: number, tags?: string[]): Promise<any>;
    updateCourseLastUpdated(courseId: string, lastUpdated?: Date): Promise<any>;
    recordCourseView(courseId: string, userId: string): Promise<any>;
    deleteCourse(courseId: string, userId: string): Promise<any>;
    getCourseByUserId(userId: string, options?: {
        offset?: number;
        limit?: number;
    }): Promise<any>;
    getCourseById(id: string): Promise<any>;
    private requirePayoutAccountForPaidCourse;
}
