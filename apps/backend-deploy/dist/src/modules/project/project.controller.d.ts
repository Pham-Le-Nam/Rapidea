import { ProjectService } from "./project.service";
import { UsersService } from "../users/users.service";
import { AddProjectDto } from "./project-dto/add-project.dto";
import { UpdateProjectDto } from "./project-dto/update-project.dto";
export declare class ProjectController {
    private readonly projectService;
    private readonly userService;
    constructor(projectService: ProjectService, userService: UsersService);
    getProject(username: string, req: any): Promise<{
        projects: any;
        isOwner: boolean;
    }>;
    addProject(req: any, addProjectDto: AddProjectDto): Promise<any>;
    updateProject(req: any, updateProjectDto: UpdateProjectDto): Promise<any>;
    deleteProject(req: any, id: string): Promise<any>;
}
