import { CourseService } from '../course/course.service';
import { PhotoRepository } from './photo.repository';
export declare class PhotoService {
    private readonly photoRepo;
    private readonly courseService;
    constructor(photoRepo: PhotoRepository, courseService: CourseService);
    private rootFolder;
    private mediaFolder;
    uploadPhoto(file: Express.Multer.File, userId: string): Promise<any>;
    getPhotoById(id: number): Promise<any>;
    uploadCourseThumbnail(file: Express.Multer.File, userId: string, courseId: string): Promise<{
        photo: any;
        course: any;
    }>;
    private getExtension;
}
