import { ProjectService } from "../project/project.service";
import { ProjectLinkService } from "./project-link.service";
import { AddProjectLinkDto } from "./project-link-dto/add-project-link.dto";
import { UpdateProjectLinkDto } from "./project-link-dto/update-project-link.dto";
export declare class ProjectLinkController {
    private readonly projectLinkService;
    private readonly projectService;
    constructor(projectLinkService: ProjectLinkService, projectService: ProjectService);
    getProjectLinks(projectId: string): Promise<{
        projectLinks: any;
    }>;
    addProjectLink(req: any, addProjectLinkDto: AddProjectLinkDto): Promise<{
        projectLink: any;
    }>;
    updateProjectLink(req: any, updateProjectLinkDto: UpdateProjectLinkDto): Promise<{
        projectLink: any;
    }>;
    deleteProjectLink(req: any, data: {
        id: string;
    }): Promise<{
        projectLink: any;
    }>;
}
