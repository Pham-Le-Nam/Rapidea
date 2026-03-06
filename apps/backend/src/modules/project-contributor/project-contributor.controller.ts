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
import { ProjectContributorService } from "./project-contributor.service";
import { AddProjectContributorDto } from "./project-contributor-dto/add-project-contributor.dto";
import { UpdateProjectContributorDto } from "./project-contributor-dto/update-project-contributor.dto";
import { DeleteProjectContributorDto } from "./project-contributor-dto/delete-project-contributor.dto";

@Controller('api/project-contributor')
export class ProjectContributorController {
    constructor (
        private readonly projectService: ProjectService,
        private readonly projectContributorService: ProjectContributorService,
    ){}

    @Get(':projectId')
    async getProjectContributor(
        @Param('projectId') projectId: string,
    ) {
        const projectContributors = await this.projectContributorService.getProjectContributors(projectId);

        return {
            projectContributors,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addProjectContributor(
        @Request() req: any,
        @Body() addProjectContributorDto: AddProjectContributorDto,
    ) {
        const viewer = req.user;

        const isOwner = await this.projectService.isOwner(addProjectContributorDto.projectId, viewer.userId);

        if(!isOwner) {
            throw new InternalServerErrorException("Updater is not owner");
        }

        const projectContributor = await this.projectContributorService.createProjectContributor(
            addProjectContributorDto.projectId,
            addProjectContributorDto.userId,
            addProjectContributorDto.role,
        );

        if (!projectContributor) {
            throw new InternalServerErrorException("Couldn't add project contributor");
        }

        return {
            projectContributor,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updateProjectContributor (
        @Request() req: any,
        @Body() updateProjectContributorDto: UpdateProjectContributorDto,
    ) {
        const viewer = req.user;

        const isOwner = await this.projectService.isOwner(updateProjectContributorDto.projectId, viewer.userId);

        if(!isOwner) {
            throw new InternalServerErrorException("Updater is not owner");
        }

        const projectContributor = await this.projectContributorService.updateProjectContributor(
            updateProjectContributorDto.projectId,
            updateProjectContributorDto.userId,
            updateProjectContributorDto.role,
        );

        if (!projectContributor) {
            throw new InternalServerErrorException("Couldn't update project contributor");
        }

        return {
            projectContributor,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteProjectContributor (
        @Request() req: any,
        @Body() deleteProjectContributorDto: DeleteProjectContributorDto,
    ) {
        const view = req.user;

        const isOwner = await this.projectService.isOwner(deleteProjectContributorDto.projectId, view.userId);

        if(!isOwner) {
            throw new InternalServerErrorException("Updater is not owner");
        }

        const projectContributor = await this.projectContributorService.updateProjectContributor(
            deleteProjectContributorDto.projectId,
            deleteProjectContributorDto.userId,
        );

        if (!projectContributor) {
            throw new InternalServerErrorException("Couldn't delete project contributor");
        }

        return {
            projectContributor,
        };
    }
}