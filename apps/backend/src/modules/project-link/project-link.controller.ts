import { Controller, 
    UseGuards, 
    Get, 
    Param, 
    Request,
    Post, 
    Body,
    InternalServerErrorException,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { ProjectService } from "../project/project.service";
import { ProjectLinkService } from "./project-link.service";
import { AddProjectLinkDto } from "./project-link-dto/add-project-link.dto";
import { UpdateProjectLinkDto } from "./project-link-dto/update-project-link.dto";

@Controller('api/project-link')
export class ProjectLinkController {
    constructor (
        private readonly projectLinkService: ProjectLinkService,
        private readonly projectService: ProjectService,
    ) {}

    @Get(":projectId")
    async getProjectLinks(
        @Param('projectId') projectId: string,
    ) {
        const projectLinks = await this.projectLinkService.getProjectLinks(projectId);

        return {
            projectLinks,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addProjectLink (
        @Request() req: any,
        @Body() addProjectLinkDto: AddProjectLinkDto,
    ) {
        const viewer = req.user;

        const isOwner = await this.projectService.isOwner(addProjectLinkDto.projectId, viewer.userId);

        if(!isOwner) {
            throw new InternalServerErrorException("Updater is not owner");
        }

        const projectLink = await this.projectLinkService.createProjectLink(
            addProjectLinkDto.projectId, 
            addProjectLinkDto.name, 
            addProjectLinkDto.url,
        );

        if (!projectLink) {
            throw new InternalServerErrorException("Couldn't add project link");
        }

        return {
            projectLink,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updateProjectLink (
        @Request() req: any,
        @Body() updateProjectLinkDto: UpdateProjectLinkDto,
    ) {
        const viewer = req.user;

        const projectLink = await this.projectLinkService.getProjectLinkById(updateProjectLinkDto.id);

        const isOwner = await this.projectService.isOwner(projectLink.projectId, viewer.userId);

        if(!isOwner) {
            throw new InternalServerErrorException("Updater is not owner");
        }

        const updatedProjectLink = await this.projectLinkService.updateProjectLink(
            updateProjectLinkDto.id, 
            updateProjectLinkDto.name, 
            updateProjectLinkDto.url,
        );

        if (!updatedProjectLink) {
            throw new InternalServerErrorException("Couldn't update project link");
        }

        return {
            projectLink: updatedProjectLink,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteProjectLink (
        @Request() req: any,
        @Body() data: { id: string },
    ) {
        const viewer = req.user;

        const projectLink = await this.projectLinkService.getProjectLinkById(data.id);

        const isOwner = await this.projectService.isOwner(projectLink.projectId, viewer.userId);

        if(!isOwner) {
            throw new InternalServerErrorException("deleter is not owner");
        }

        const deletedProjectLink = await this.projectLinkService.deleteProjectLink(data.id);

        if (!deletedProjectLink) {
            throw new InternalServerErrorException("Couldn't delete project link");
        }

        return {
            projectLink: deletedProjectLink,
        };
    }
}