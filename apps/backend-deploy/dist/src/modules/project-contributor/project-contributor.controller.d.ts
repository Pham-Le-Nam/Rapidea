import { ProjectService } from "../project/project.service";
import { ProjectContributorService } from "./project-contributor.service";
import { AddProjectContributorDto } from "./project-contributor-dto/add-project-contributor.dto";
import { UpdateProjectContributorDto } from "./project-contributor-dto/update-project-contributor.dto";
import { DeleteProjectContributorDto } from "./project-contributor-dto/delete-project-contributor.dto";
export declare class ProjectContributorController {
    private readonly projectService;
    private readonly projectContributorService;
    constructor(projectService: ProjectService, projectContributorService: ProjectContributorService);
    getProjectContributor(projectId: string): Promise<{
        projectContributors: any;
    }>;
    addProjectContributor(req: any, addProjectContributorDto: AddProjectContributorDto): Promise<{
        projectContributor: any;
    }>;
    updateProjectContributor(req: any, updateProjectContributorDto: UpdateProjectContributorDto): Promise<{
        projectContributor: any;
    }>;
    deleteProjectContributor(req: any, deleteProjectContributorDto: DeleteProjectContributorDto): Promise<{
        projectContributor: any;
    }>;
}
