import { 
    Controller, 
    UseGuards, 
    Get, 
    Post, 
    InternalServerErrorException, 
    NotFoundException,
    Request,
    Body,
    Param,
} from '@nestjs/common';
import { FileInPostService } from './file-in-post.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AddFileInPostDto } from './file-in-post-dto/add-file-in-post.dto';
import { DeleteFileInPostDto } from './file-in-post-dto/delete-file-in-post.dto';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt.guard';

@Controller('api/file-in-post')
export class FileInPostController {
    constructor(
        private readonly fileInPostService: FileInPostService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addFileToPost (
        @Request() req: any,
        @Body() addFileInPostDto: AddFileInPostDto,
    ) {
        const user = req.user;
        const fileInPost = await this.fileInPostService.addFileToPost(addFileInPostDto.fileId, addFileInPostDto.postId, user.userId);

        if (!fileInPost) {
            throw new InternalServerErrorException("", "Couldn't add file to post");
        }

        return fileInPost;
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteFileFromPost (
        @Request() req: any,
        @Body() deleteFileInPostDto: DeleteFileInPostDto,
    ) {
        const user = req.user;
        const fileInPost = await this.fileInPostService.removeFileFromPost(deleteFileInPostDto.fileId, deleteFileInPostDto.postId, user.userId);
        
        if (!fileInPost) {
            throw new InternalServerErrorException("", "Couldn't delete file from post");
        }

        return fileInPost;
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Get('post/:postId')
    async getFilesOfPost(
        @Request() req: any,
        @Param() data: { postId: string },
    ) {
        const user = req.user;
        const files = await this.fileInPostService.getFilesByPostId(data.postId);
        return files;
    } 
}
