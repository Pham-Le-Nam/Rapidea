import { PhotoService } from './photo.service';
export declare class PhotoController {
    private readonly photoService;
    constructor(photoService: PhotoService);
    uploadPhoto(photo: Express.Multer.File, req: any): Promise<any>;
    uploadCourseThumbnail(courseId: string, photo: Express.Multer.File, req: any): Promise<{
        photo: any;
        course: any;
    }>;
    getPhoto(id: number): Promise<any>;
}
