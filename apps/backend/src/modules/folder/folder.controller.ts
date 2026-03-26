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
} from "@nestjs/common";
import { FolderService } from "./folder.service";
import { OptionalJwtAuthGuard } from "../auth/optional-jwt.guard";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { AddFolderDto } from "./folder-dto/add-folder.dto";
import { RenameFolderDto } from "./folder-dto/rename-folder.dto";
import { MoveFolderDto } from "./folder-dto/move-folder.dto";

@Controller('api/folder')
export class FolderController {
    constructor (
        private readonly folderService: FolderService,
    ) {}

    @UseGuards(OptionalJwtAuthGuard)
    @Get(':id')
    async getFolderById (
        @Param('id') id: string,
        @Request() req: any,
    ) {
        const viewer = req.user;
        const folder = await this.folderService.findFolderById(id);

        if (!folder) {
            throw new NotFoundException('Folder not found');
        }

        const isOwner = (viewer.userId === folder.userId);

        const children = await this.folderService.findAllChildren(id);

        if (!children) {
            throw new NotFoundException('Children not found');
        }

        const childrenFolders = children.childrenFolders;
        const childrenFiles = children.childrenFiles;

        return {
            folder,
            isOwner,
            childrenFolders,
            childrenFiles,
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addFolder (
        @Request() req: any,
        @Body() addFolderdto: AddFolderDto,
    ) {
        const user = req.user;
        const folder = await this.folderService.createFolder(user.userId, addFolderdto.folderName, addFolderdto.parentId);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't create folder");
        }

        return folder;
    }

    @UseGuards(JwtAuthGuard)
    @Post('rename')
    async renameFolder (
        @Request() req: any,
        @Body() renameFolderDto: RenameFolderDto,
    ) {
        const user = req.user;
        const folder = await this.folderService.renameFolder(renameFolderDto.folderId, user.userId, renameFolderDto.name);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't rename the folder");
        }

        return folder;
    }

    @UseGuards(JwtAuthGuard)
    @Post('move')
    async moveFolder (
        @Request() req: any,
        @Body() moveFolderDto: MoveFolderDto,
    ) {
        const user = req.user;
        const folder = await this.folderService.moveFolder(moveFolderDto.folderId, user.userId, moveFolderDto.parentId);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't move the folder");
        }

        return folder;
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteFolder (
        @Request() req: any,
        @Body() data: {folderId: string},
    ) {
        const user = req.user;
        const folder = await this.folderService.deleteFolder(data.folderId, user.userId);

        if (!folder) {
            throw new InternalServerErrorException("Couldn't move the folder");
        }

        return folder;
    }
}