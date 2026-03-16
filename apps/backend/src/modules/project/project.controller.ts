import { Controller, 
    UseGuards, 
    Get, 
    Param, 
    Request, 
    NotFoundException, 
    Post, 
    Body,
    InternalServerErrorException,
} from "@nestjs/common";
import { OptionalJwtAuthGuard } from '../auth/optional-jwt.guard';
import { JwtAuthGuard } from "../auth/jwt.guard";
import { ProjectService } from "./project.service";
import { UsersService } from "../users/users.service";
import { AddProjectDto } from "./project-dto/add-project.dto";
import { UpdateProjectDto } from "./project-dto/update-project.dto";

@Controller('api/project')
export class ProjectController {
    constructor (
        private readonly projectService: ProjectService,
        private readonly userService: UsersService
    ){}

    @UseGuards(OptionalJwtAuthGuard)
    @Get(':username')
    async getProject(
        @Param('username') username: string,
        @Request() req: any
    ) {
        const viewer = req.user;
        const owner = await this.userService.getUserByUsername(username);

        if(!owner) {
            throw new NotFoundException("User not found");
        }

        const projects = await this.projectService.getProjectByUserId(owner.id);

        if(!projects) {
            throw new NotFoundException("Project not found");
        }

        return {
            projects,
            isOwner: viewer?.userId === owner.id,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addProject(
        @Request() req: any,
        @Body() addProjectDto: AddProjectDto,
    ) {
        const user = req.user;

        const project = await this.projectService.createProject(
            user.userId,
            addProjectDto.name,
            addProjectDto.role,
            addProjectDto.startedAt,
            addProjectDto.endedAt,
            addProjectDto.details,
            addProjectDto.logoId,
        );

        if (!project) {
            throw new InternalServerErrorException("Couldn't add project");
        }

        return this.projectService.getProjectByUserId(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updateProject(
        @Request() req: any,
        @Body() updateProjectDto: UpdateProjectDto,
    ) {
        const user = req.user;

        const project = await this.projectService.updateProjectById(
            updateProjectDto.id,
            user.userId,
            updateProjectDto.name,
            updateProjectDto.role,
            updateProjectDto.startedAt,
            updateProjectDto.endedAt,
            updateProjectDto.details,
            updateProjectDto.logoId,
        );

        if (!project) {
            throw new InternalServerErrorException("Couldn't update project");
        }

        return this.projectService.getProjectByUserId(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteProject(
        @Request() req: any,
        @Body('id') id: string,
    ) {
        const user = req.user;

        const deletedProject = this.projectService.deleteProjectById(id, user.userId);

        if (!deletedProject) {
            throw new InternalServerErrorException("Couldn't delete project");
        }

        return this.projectService.getProjectByUserId(user.userId);
    }
}