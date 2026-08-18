import { addProjectApi, addProjectLinkApi, deleteProjectApi, deleteProjectLinkApi, getProjectApi, getProjectLinkApi, updateProjectApi, updateProjectLinkApi } from "@/features/profile/api";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import { FormatDate, FormatDateInput } from "../utils/FormatDate";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Field, FieldGroup } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import toast from "react-hot-toast";
import { useAuth } from "@/providers";
import { useNavigate } from "react-router-dom";
import { DEFAULT_PROJECT_LOGO_URL } from "@/shared/lib/media";
import {
    ProfileItemImage,
    ProfileItemImageEditor,
} from "./ProfileItemImage";
import {
    type ProfileItemImageChange,
    resolveProfileItemLogoId,
} from "../utils/profileItemImageUtils";
import { getProfileApiErrorMessage } from "../utils/profileApiError";

type projectProps = {
    username: string,
    isOwner?: boolean,
}

function Project({ username, isOwner = false }: projectProps) {
    const [projectsList, setProjectsList] = useState<any[]>([]);
    const [projectsLinksLists, setProjectLinksList] = useState<any[][]>([]);
    const [showAllProject, setShowAllProject] = useState(false);
    const collapseNumber = 5;
    const visibleProjects = showAllProject ?  projectsList : projectsList.slice(0, collapseNumber);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const loadProjects = async () => {
        try {
            const response = await getProjectApi(username);
            setProjectsList(response.projects);

            const allLinks = [];

            for (const project of response.projects) {
                const projectLinks = await getProjectLinkApi(project.id);
                allLinks.push(projectLinks.projectLinks);
            }

            setProjectLinksList(allLinks);
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("Token Expired");
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login')
            // handle logout or redirect
            }
            throw error;
        }
    }

    const deleteProject = async (id: string) => {
        try {
            const projectResponse = await getProjectLinkApi(id);

            for (const link of projectResponse.projectLinks) {
                await deleteProjectLinkApi(link.id);
            }

            await deleteProjectApi(id);

            loadProjects();
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("Token Expired");
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login')
            // handle logout or redirect
            }
            throw error;
        }
    }
    
    useEffect(() => {
        loadProjects();
    }, [username]);

    return (
        <div className="flex flex-col items-start justify-start rounded-md border shadow-md w-full gap-3 px-3 py-3">
            <div className="flex flex-row justify-between items-center w-full border-b-2 pb-2">
                <h1 className="font-bold text-xl">
                    Projects
                </h1>
                
                {isOwner && (
                    <AddProject reloadProject={loadProjects}/>
                )}
            </div>

            {visibleProjects.map((project, index) => (
                <div className="flex flex-row items-start justify-start gap-3 border-b w-full pb-3" key={`${project.name}-${index}`}>
                    <ProfileItemImage logoId={project.logoId} alt={`${project.name} logo`} fallbackUrl={DEFAULT_PROJECT_LOGO_URL} />

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
                                    <span key={`${project.id}-${link.id ?? i}`}>
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

                    {isOwner && (
                        <div className="flex flex-col">
                            <EditProject project={project} reloadProject={loadProjects} linksList={projectsLinksLists[index]}/>

                            <Button type="button" className="border bg-white text-red-600 hover:bg-gray-100 hover:text-red-600" onClick={() => deleteProject(project.id)}>
                                Delete
                            </Button>
                        </div>
                    )}
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

function EditProject({ project, reloadProject, linksList }: EditProjectProps) {
    const [projectName, setProjectName] = useState(project.name);
    const [role, setRole] = useState(project.role);
    const [startedAt, setStartedAt] = useState(FormatDateInput(project.startedAt));
    const [endedAt, setEndedAt] = useState(FormatDateInput(project.endedAt));
    const [description, setDescription] = useState(project.details);
    const [links, setLinks] = useState<any[]>([]);
    const [linkName, setLinkName] = useState("");
    const [linkUrl, setLinkUrl] = useState("");
    const [imageChange, setImageChange] = useState<ProfileItemImageChange>(undefined);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setLinks(linksList);
    }, [linksList]);

    const submit = async () => {
        try {
            for (const link of links) {
                await updateProjectLinkApi(link.id, link.name, link.url);
            }

            const logoId = await resolveProfileItemLogoId(project.logoId, imageChange);
            const response = await updateProjectApi(project.id, projectName, role, startedAt, endedAt, description, logoId);

            if (response) {
                toast.success("Update project Successfully!");
                window.location.reload();
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("Token Expired");
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login')
                return;
            }
            toast.error(getProfileApiErrorMessage(error, "Could not update project"));
        }
    }

    const editLinkName = (index: number, name: string) => {
        setLinks(prev => {
            if (!prev) return prev;

            const updated = [...prev]; // new array
            updated[index] = {
                ...updated[index],     // new object
                name: name
            };

            return updated;
        });
    };

    const editLinkUrl = (index: number, url: string) => {
        setLinks(prev => {
            if (!prev) return prev;

            const updated = [...prev]; // new array
            updated[index] = {
                ...updated[index],     // new object
                url: url
            };

            return updated;
        });
    };

    const deleteLink = async (index: number) => {
        try {
            await deleteProjectLinkApi(links[index].id);
            setLinks(prev => {
                const updated = prev.filter((_, i) => i !== index); // remove element at index
                return updated;
            });
            reloadProject();
        } catch (error: any) {
            throw error;
        }
    }

    const addLink = async () => {
        try {
            if (linkName == "" || linkUrl == "") {
                throw new Error("Please fill in name/url");
            }
            const response = await addProjectLinkApi(project.id, linkName, linkUrl);
            setLinks(prev => [...prev, {id: response.id ,name: linkName, url: linkUrl}]);
            setLinkName("");
            setLinkUrl("");
            reloadProject();
        } catch (error: any) {
            throw error;
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
                        <ProfileItemImageEditor
                            title="Project"
                            currentLogoId={project.logoId}
                            value={imageChange}
                            onChange={setImageChange}
                            fallbackUrl={DEFAULT_PROJECT_LOGO_URL}
                        />
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
                            <textarea
                                id="description-1"
                                name="description"
                                value={description}
                                className="min-h-24 rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </Field>

                        {links?.map((link, index) => (
                            <div className="flex flex-col md:flex-row gap-3" key={`link-${index}`}>
                                <Field>
                                    <Label htmlFor={`link-name-${index}`}>Name</Label>
                                    <Input id={`link-name-${index}`} name="link-name" value={link.name} onChange={(n) => editLinkName(index, n.target.value)}/>
                                </Field>
                                
                                <Field>
                                    <Label htmlFor={`link-url-${index}`}>URL</Label>
                                    <Input id={`link-url-${index}`} name="link-url" value={link.url} onChange={(n) => editLinkUrl(index, n.target.value)}/>
                                </Field>

                                <Button asChild className="bg-white hover:bg-gray-100 text-black border md:mt-6.5 md:w-18" onClick={() => deleteLink(index)}>
                                    <p>
                                        Delete
                                    </p>
                                </Button>
                            </div>
                        ))}

                        <div className="flex flex-col md:flex-row gap-3 border-y-2 py-5">
                            <Field>
                                <Label htmlFor="started-at-1">Name</Label>
                                <Input id="started-at-1" name="started-at" value={linkName} onChange={(n) => setLinkName(n.target.value)}/>
                            </Field>
                            
                            <Field>
                                <Label htmlFor="ended-at-1">URL</Label>
                                <Input id="ended-at-1" name="ended-at" value={linkUrl} onChange={(n) => setLinkUrl(n.target.value)}/>
                            </Field>

                            <Button asChild className="bg-main hover:bg-main-hover border md:mt-6.5 md:w-18" onClick={() => addLink()}>
                                <p>
                                    Add
                                </p>
                            </Button>
                        </div>
                    </FieldGroup>
                    <DialogFooter className="pt-3">
                        <DialogClose asChild>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" className="bg-main hover:bg-main-hover">
                                Save changes
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                    </form>
            </DialogContent>
        </Dialog>
    ) 
}

type AddProjectProps = {
    reloadProject: () => Promise<void>;
};

function AddProject({ reloadProject }: AddProjectProps) {
    const [projectName, setProjectName] = useState("");
    const [role, setRole] = useState("");
    const [startedAt, setStartedAt] = useState<string>();
    const [endedAt, setEndedAt] = useState<string>();
    const [description, setDescription] = useState("");
    const [links, setLinks] = useState<any[]>([]);
    const [linkName, setLinkName] = useState("");
    const [linkUrl, setLinkUrl] = useState("");
    const [imageChange, setImageChange] = useState<ProfileItemImageChange>(undefined);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const submit = async () => {
        try {
            const logoId = await resolveProfileItemLogoId(undefined, imageChange);
            const response = await addProjectApi(projectName, role, startedAt, endedAt, description, logoId ?? undefined);
            
            for (const link of links) {
                await addProjectLinkApi(response.id, link.name, link.url);
            }

            if (response) {
                toast.success("Update project Successfully!");
                reloadProject();
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("Token Expired");
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login')
            // handle logout or redirect
            }
            throw error;
        }
    }

    const editLinkName = (index: number, name: string) => {
        setLinks(prev => {
            if (!prev) return prev;

            const updated = [...prev]; // new array
            updated[index] = {
                ...updated[index],     // new object
                name: name
            };

            return updated;
        });
    };

    const editLinkUrl = (index: number, url: string) => {
        setLinks(prev => {
            if (!prev) return prev;

            const updated = [...prev]; // new array
            updated[index] = {
                ...updated[index],     // new object
                url: url
            };

            return updated;
        });
    };

    const deleteLink = async (index: number) => {
        try {
            setLinks(prev => {
                const updated = prev.filter((_, i) => i !== index); // remove element at index
                return updated;
            });
            reloadProject();
        } catch (error: any) {
            throw error;
        }
    }

    const addLink = async () => {
        try {
            if (linkName == "" || linkUrl == "") {
                throw new Error("Please fill in name/url");
            }
            setLinks(prev => [...prev, {name: linkName, url: linkUrl}]);
            setLinkName("");
            setLinkUrl("");
            reloadProject();
        } catch (error: any) {
            throw error;
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-main hover:bg-main-hover text-white hover:text-white">
                    Add
                </Button>
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
                        <ProfileItemImageEditor
                            title="Project"
                            value={imageChange}
                            onChange={setImageChange}
                            fallbackUrl={DEFAULT_PROJECT_LOGO_URL}
                        />
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
                            <textarea
                                id="description-1"
                                name="description"
                                value={description}
                                className="min-h-24 rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </Field>

                        {links?.map((link, index) => (
                            <div className="flex flex-col md:flex-row gap-3" key={`link-${index}`}>
                                <Field>
                                    <Label htmlFor={`link-name-${index}`}>Name</Label>
                                    <Input id={`link-name-${index}`} name="link-name" value={link.name} onChange={(n) => editLinkName(index, n.target.value)}/>
                                </Field>
                                
                                <Field>
                                    <Label htmlFor={`link-url-${index}`}>URL</Label>
                                    <Input id={`link-url-${index}`} name="link-url" value={link.url} onChange={(n) => editLinkUrl(index, n.target.value)}/>
                                </Field>

                                <Button asChild className="bg-white hover:bg-gray-100 text-black border md:mt-6.5 md:w-18" onClick={() => deleteLink(index)}>
                                    <p>
                                        Delete
                                    </p>
                                </Button>
                            </div>
                        ))}

                        <div className="flex flex-col md:flex-row gap-3 border-y-2 py-5">
                            <Field>
                                <Label htmlFor="started-at-1">Name</Label>
                                <Input id="started-at-1" name="started-at" value={linkName} onChange={(n) => setLinkName(n.target.value)}/>
                            </Field>
                            
                            <Field>
                                <Label htmlFor="ended-at-1">URL</Label>
                                <Input id="ended-at-1" name="ended-at" value={linkUrl} onChange={(n) => setLinkUrl(n.target.value)}/>
                            </Field>

                            <Button asChild className="bg-main hover:bg-main-hover border md:mt-6.5 md:w-18" onClick={() => addLink()}>
                                <p>
                                    Add
                                </p>
                            </Button>
                        </div>
                    </FieldGroup>
                    <DialogFooter className="pt-3">
                        <DialogClose asChild>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" className="bg-main hover:bg-main-hover">
                                Save changes
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                    </form>
            </DialogContent>
        </Dialog>
    ) 
}
