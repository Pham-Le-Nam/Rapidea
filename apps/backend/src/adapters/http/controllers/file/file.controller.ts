import { 
    Controller, 
    Get, 
    Param, 
    Post,
    Query,
    Request,
    UseGuards,
    NotFoundException,
    Body,
    InternalServerErrorException,
    StreamableFile,
    UseInterceptors,
    UploadedFile,
} from "@nestjs/common";
import { FileService } from "../../../../application/file/file.service";
import { OptionalJwtAuthGuard } from "../../guards/auth/optional-jwt.guard";
import { JwtAuthGuard } from "../../guards/auth/jwt.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateFileDto } from "../../dto/file/update-file.dto";

@Controller('api/file')
export class FileController {
    constructor (
        private readonly fileService: FileService
    ) {}

    @UseGuards(OptionalJwtAuthGuard)
    @Get('url/:id')
    async getFileUrl (
        @Request() req: any,
        @Param('id') id: string,
    ) {
        const user = req.user;
        const fileUrl = await this.fileService.getFileUrl(id);

        // Need logic to check if the user is the owner or subscribed to the course

        return fileUrl;
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Get('office-preview-url/:id')
    async getOfficePreviewUrl (
        @Param('id') id: string,
    ) {
        return this.fileService.createOfficePreviewUrl(id);
    }

    @Get('office-preview/:id/:fileName')
    async previewOfficeFile (
        @Param('id') id: string,
        @Query('expires') expires: string,
        @Query('signature') signature: string,
    ) {
        const { file, stream } = await this.fileService.getOfficePreview(
            id,
            expires,
            signature,
        );

        return new StreamableFile(stream, {
            type: file.mimeType || 'application/octet-stream',
            disposition: this.inlineContentDisposition(file.name),
            length: file.size,
        });
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Get('download/:id')
    async downloadFile (
        @Param('id') id: string,
    ) {
        const { file, stream } = await this.fileService.getFileDownload(id);

        return new StreamableFile(stream, {
            type: file.mimeType || 'application/octet-stream',
            disposition: this.attachmentContentDisposition(file.name),
            length: file.size,
        });
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Get(':id')
    async getFile (
        @Request() req: any,
        @Param('id') id: string,
    ) {
        const user = req.user;
        const file = await this.fileService.getFileById(id);

        // Need logic to check if the user is the owner or subscribed to the course

        return{
            file,
            isOwner: user ? file.userId === user.userId : false,
        };
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

    private attachmentContentDisposition(fileName: string): string {
        return this.contentDisposition('attachment', fileName);
    }

    private inlineContentDisposition(fileName: string): string {
        return this.contentDisposition('inline', fileName);
    }

    private contentDisposition(
        disposition: 'attachment' | 'inline',
        fileName: string,
    ): string {
        const asciiFileName = fileName
            .normalize('NFKD')
            .replace(/[^\x20-\x7E]/g, '_')
            .replace(/["\\]/g, '_');
        const encodedFileName = encodeURIComponent(fileName).replace(
            /[!'()*]/g,
            (character) =>
                `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
        );

        return `${disposition}; filename="${asciiFileName || 'file'}"; filename*=UTF-8''${encodedFileName}`;
    }
}
