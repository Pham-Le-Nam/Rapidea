import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../guards/auth/jwt.guard';
import { PhotoService } from '../../../../application/photo/photo.service';

@Controller('api/photo')
export class PhotoController {
    constructor(
        private readonly photoService: PhotoService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('photo'))
    async uploadPhoto(
        @UploadedFile() photo: Express.Multer.File,
        @Request() req: any,
    ) {
        return this.photoService.uploadPhoto(photo, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('course/:courseId/thumbnail')
    @UseInterceptors(FileInterceptor('photo'))
    async uploadCourseThumbnail(
        @Param('courseId') courseId: string,
        @UploadedFile() photo: Express.Multer.File,
        @Request() req: any,
    ) {
        return this.photoService.uploadCourseThumbnail(photo, req.user.userId, courseId);
    }

    @Get(':id')
    async getPhoto(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.photoService.getPhotoById(id);
    }
}
