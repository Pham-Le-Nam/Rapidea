import { getProjectApi, getProjectLinkApi, updateExperienceApi } from "@/api";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FormatDate, FormatDateInput } from "./FormatDate";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

type projectProps = {
    username: string,
    isOwner?: boolean,
}

function Project({ username, isOwner = false }: projectProps) {
    const [projectsList, setProjectsList] = useState<any[]>([]);
    const [projectsLinksLists, setProjectLinksList] = useState<any[][]>([]);
    const [showAllProject, setShowAllProject] = useState(false);
    const collapseNumber = 1;
    const visibleProjects = showAllProject ?  projectsList : projectsList.slice(0, collapseNumber);

    const addProjectLinks = (linksList: any) => {
        setProjectLinksList(prev => [...prev, linksList]);
    }

    const loadProjects = async () => {
        try {
            const response = await getProjectApi(username);
            setProjectsList(response.projects);

            for (const project of response.projects) {
                const projectLinks = await getProjectLinkApi(project.id);
                addProjectLinks(projectLinks.projectLinks);
            }

        } catch (error: any) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        loadProjects()
    }, [username]);

    return (
        <div className="flex flex-col items-start justify-start rounded-md border shadow-md w-full gap-3 px-3 py-3">
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="font-bold text-xl">
                    Projects
                </h1>
                
                {isOwner && (
                    <Button asChild className="bg-white hover:bg-gray-100 text-black p-0 w-20">
                        <p className="text-lg">
                            Edit
                        </p>
                    </Button>
                )}
            </div>

            {visibleProjects.map((project, index) => (
                <div className="flex flex-row items-start justify-start gap-3 border-b w-full pb-3" key={project.name}>
                    <img src="http://localhost:1234/storage/media/default_avatar.png" className="rounded-full w-10 aspect-square"/>

                    <div className="mt-2 w-full">
                        <h1 className="font-bold">
                            {project.name}
                        </h1>

                        <h2 className="">
                            {`Role: ${project.role}`}
                        </h2>

                        <h2 className="w-full font-semibold">
                            {`${FormatDate(project.startedAt)} - ${FormatDate(project.endedAt)}`}
                        </h2>

                        <p className="whitespace-break-spaces">
                            {`Description: ${project.details}`}
                        </p>
                        
                        <div className="flex flex-row w-full items-start">
                            <p className="whitespace-break-spaces font-semibold">
                                Project Links:{" "}
                                {(projectsLinksLists[index] ?? []).map((link, i) => (
                                    <span key={link.url}>
                                    <a
                                        href={link.url}
                                        className="text-main hover:text-main-hover hover:underline"
                                    >
                                        {link.name}
                                    </a>
                                    {i < (projectsLinksLists[index]?.length ?? 0) - 1 && ", "}
                                    </span>
                                ))}
                            </p>
                        </div>

                        {/* <p className="whitespace-break-spaces">
                            {"Other Contributors: \"Full name of contributors that links to their profiles\""}
                        </p> */}
                        
                    </div>

                    <EditProject project={project} reloadProject={loadProjects} linksList={projectsLinksLists}/>
                </div>
            ))}

            {projectsList.length > collapseNumber && (
                <Button asChild className="bg-white hover:bg-gray-100 text-black p-0 w-full" onClick={() => setShowAllProject((showAllProject) => (!showAllProject))}>
                    <p>
                        {showAllProject ? "Show Less" : "Show More"}
                    </p>
                </Button>
            )}
        </div>
    );
}

export default Project;

type EditProjectProps = {
    project: any;
    reloadProject: () => Promise<void>;
    linksList: any[];
};

type ProjectLink = {
    name: string;
    url: string;
}

function EditProject({ project, reloadProject, linksList }: EditProjectProps) {
    const [projectName, setProjectName] = useState(project.name);
    const [role, setRole] = useState(project.role);
    const [startedAt, setStartedAt] = useState(FormatDateInput(project.startedAt));
    const [endedAt, setEndedAt] = useState(FormatDateInput(project.endedAt));
    const [description, setDescription] = useState(project.details);
    const [links, setLinks] = useState(linksList);
    const [linkName, setLinkName] = useState("");
    const [linkUrl, setLinkUrl] = useState("");

    const submit = async () => {
        try {
            // const response = await updateExperienceApi(project.id, organizationName, location, position, role, startedAt, endedAt, description);

            // if (response) {
            //     toast.success("Update project Successfully!");
            //     reloadProject();
            // }
            console.log('hello');
        } catch (error: any) {
            toast.error(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90%] max-h-[90%] overflow-y-auto">
                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}
                >
                    <DialogHeader>
                        <DialogTitle>Edit project</DialogTitle>
                        <DialogDescription>
                            Make changes to your project here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="project-name-1">Project Name</Label>
                            <Input id="project-name-1" name="project-name" value={projectName} onChange={(n) => setProjectName(n.target.value)}/>
                        </Field>
                        <Field>
                            <Label htmlFor="role-1">Role</Label>
                            <Input id="role-1" name="role" value={role} onChange={(n) => setRole(n.target.value)}/>
                        </Field>
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <Field>
                                <Label htmlFor="started-at-1">Started At</Label>
                                <Input id="started-at-1" name="started-at" type="date" value={FormatDateInput(startedAt)} onChange={(n) => setStartedAt(n.target.value)}/>
                            </Field>
                            
                            <Field>
                                <Label htmlFor="ended-at-1">Ended At</Label>
                                <Input id="ended-at-1" name="ended-at" type="date" value={FormatDateInput(endedAt)} onChange={(n) => setEndedAt(n.target.value)}/>
                            </Field>
                        </div>
                        <Field>
                            <Label htmlFor="description-1">Description</Label>
                            <Input id="description-1" name="description" value={description} onChange={(n) => setDescription(n.target.value)}/>
                        </Field>

                        {links?.map((link, index) => (
                            <div className="flex flex-row gap-3">
                                <Field>
                                    <Label htmlFor="started-at-1">Started At</Label>
                                    <Input id="started-at-1" name="started-at" type="date" value={FormatDateInput(startedAt)} onChange={(n) => setStartedAt(n.target.value)}/>
                                </Field>
                                
                                <Field>
                                    <Label htmlFor="ended-at-1">Ended At</Label>
                                    <Input id="ended-at-1" name="ended-at" type="date" value={FormatDateInput(endedAt)} onChange={(n) => setEndedAt(n.target.value)}/>
                                </Field>

                                <Button asChild className="bg-white hover:bg-gray-100 text-black border mt-5">
                                    <p>
                                        -
                                    </p>
                                </Button>
                            </div>
                        ))}

                        <div className="flex flex-row gap-3">
                            <Field>
                                <Label htmlFor="started-at-1">Name</Label>
                                <Input id="started-at-1" name="started-at" value={linkName} onChange={(n) => setLinkName(n.target.value)}/>
                            </Field>
                            
                            <Field>
                                <Label htmlFor="ended-at-1">URL</Label>
                                <Input id="ended-at-1" name="ended-at" value={linkUrl} onChange={(n) => setLinkUrl(n.target.value)}/>
                            </Field>

                            <Button asChild className="bg-white hover:bg-gray-100 text-black border">
                                <p>
                                    +
                                </p>
                            </Button>
                        </div>
                    </FieldGroup>
                    <DialogFooter className="pt-3">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit">
                                Save changes
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                    </form>
            </DialogContent>
        </Dialog>
    ) 
}