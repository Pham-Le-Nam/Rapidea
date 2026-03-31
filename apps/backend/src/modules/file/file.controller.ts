import { 
    Controller, 
    Get, 
    Param, 
    Post,
    Request,
    UseGuards,
    NotFoundException,
    Body,
    InternalServerErrorException,
    UseInterceptors,
    UploadedFile,
} from "@nestjs/common";
import { FileService } from "./file.service";
import { OptionalJwtAuthGuard } from "../auth/optional-jwt.guard";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateFileDto } from "./file-dto/update-file.dto";

@Controller('api/file')
export class FileController {
    constructor (
        private readonly fileService: FileService
    ) {}

    @UseGuards(OptionalJwtAuthGuard)
    @Get(':id')
    async getFileUrl (
        @Request() req: any,
        @Param('id') id: string,
    ) {
        const user = req.user;
        const fileUrl = this.fileService.getFileUrl(id);

        // Need logic to check if the user is the owner or subscribed to the course

        return fileUrl;
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile (
        @UploadedFile() file: Express.Multer.File,
        @Request() req: any,
        @Body() data: { folderId: string }
    ) {
        const user = req.user;
        const createdFile = await this.fileService.createFile(file, user.userId, data.folderId);

        if (!createdFile) {
            throw new InternalServerErrorException("", "Couldn't upload file");
        }

        return createdFile;
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteFile (
        @Request() req: any,
        @Body() data: { fileId: string }
    ) {
        const user = req.user;
        const file = await this.fileService.deleteFile(data.fileId, user.userId);

        if (!file) {
            throw new NotFoundException("", "File not Found");
        }

        return file;
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updateFile (
        @Request() req: any,
        @Body() updateFileDto: UpdateFileDto,
    ) {
        const user = req.user;
        const file = await this.fileService.updateFile(
            updateFileDto.fileId,
            user.userId,
            updateFileDto.folderId,
            updateFileDto.name,
        );

        if (!file) {
            throw new InternalServerErrorException("", "Couldn't update the file");
        }

        return file;
    }
}