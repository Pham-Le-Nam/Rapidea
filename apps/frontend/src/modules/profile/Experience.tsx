import { Button } from "@/components/ui/button";
import { addExperienceApi, deleteExperienceApi, getExperienceApi, updateExperienceApi } from "@/api";
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

type ExperienceProps = {
    username: string,
    isOwner?: boolean,
}

function Experience({ username, isOwner = false }: ExperienceProps) {
    const [experiencesList, setExperiencesList] = useState<any[]>([]);
    const [showAllExperience, setShowAllExperience] = useState(false);
    const collapseNumber = 1;
    const visibleExperience = showAllExperience ?  experiencesList : experiencesList.slice(0, collapseNumber);
    const { logout } = useAuth();
    const navigate =  useNavigate();

    const loadExperience = async () => {
        try {
            const response = await getExperienceApi(username);
            setExperiencesList(response.experience as any[])
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

    const deleteExperience = async (educationId: string) => {
        try {
            const response = await deleteExperienceApi(educationId);
            loadExperience();
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
        loadExperience()
    }, [username]);

    return (
        <div className="flex flex-col items-start justify-start rounded-md border shadow-md w-full gap-3 px-3 py-3">
            <div className="flex flex-row justify-between items-center w-full border-b-2 pb-2">
                <h1 className="font-bold text-xl">
                    Experience
                </h1>
                
                {isOwner && (
                    <AddExperience reloadExperience={loadExperience}/>
                )}
            </div>

            {visibleExperience.map((experience) => (
                <div className="flex flex-row items-start justify-start gap-3 border-b w-full pb-3" key={experience.name}>
                    <img src="http://localhost:1234/storage/media/default_avatar.png" className="rounded-full w-10 aspect-square"/>

                    <div className="mt-2 w-full">
                        <h1 className="font-bold w-full">
                            {experience.name}
                        </h1>

                        <h2 className="text-gray-500 w-full">
                            {experience.location}
                        </h2>

                        <h2 className="w-full">
                            {`${experience.position} - ${experience.role}`}
                        </h2>

                        <h2 className="w-full font-semibold">
                            {`${FormatDate(experience.startedAt)} - ${FormatDate(experience.endedAt)}`}
                        </h2>

                        <p className="whitespace-break-spaces">
                            {`${experience.achievement}`}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <Button asChild className="bg-white hover:bg-gray-100 text-black border" onClick={() => deleteExperience(experience.id)}>
                            <p>
                                Delete
                            </p>
                        </Button>

                        <EditExperience experience={experience} reloadExperience={loadExperience}/>
                    </div>

                    
                </div>
            ))}

            {experiencesList.length > collapseNumber && (
                <Button asChild className="bg-white hover:bg-gray-100 text-black p-0 w-full" onClick={() => setShowAllExperience((showAllExperience) => (!showAllExperience))}>
                    <p>
                        {showAllExperience ? "Show Less" : "Show More"}
                    </p>
                </Button>
            )}
        </div>
    );
}

export default Experience;

type EditExperienceProps = {
    experience: any;
    reloadExperience: () => Promise<void>;
};

function EditExperience({ experience, reloadExperience }: EditExperienceProps) {
    const [organizationName, setOrganizationName] = useState(experience.name);
    const [location, setLocation] = useState(experience.location);
    const [position, setPosition] = useState(experience.position);
    const [role, setRole] = useState(experience.role);
    const [startedAt, setStartedAt] = useState(FormatDateInput(experience.startedAt));
    const [endedAt, setEndedAt] = useState(FormatDateInput(experience.endedAt));
    const [description, setDescription] = useState(experience.achievement);

    const submit = async () => {
        try {
            const response = await updateExperienceApi(experience.id, organizationName, location, position, role, startedAt, endedAt, description);

            if (response) {
                toast.success("Update Experience Successfully!");
                reloadExperience();
            }
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
                        <DialogTitle>Edit experience</DialogTitle>
                        <DialogDescription>
                            Make changes to your experience here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="organization-name-1">Organization Name</Label>
                            <Input id="organization-name-1" name="organization-name" value={organizationName} onChange={(n) => setOrganizationName(n.target.value)}/>
                        </Field>
                        <Field>
                            <Label htmlFor="location-1">Location</Label>
                            <Input id="location-1" name="location" value={location} onChange={(n) => setLocation(n.target.value)}/>
                        </Field>
                        <div className="flex flex-row gap-3">
                            <Field>
                                <Label htmlFor="position-1">Position</Label>
                                <Input id="position-1" name="position" value={position} onChange={(n) => setPosition(n.target.value)}/>
                            </Field>
                            
                            <Field>
                                <Label htmlFor="role-1">Role</Label>
                                <Input id="role-1" name="role" value={role} onChange={(n) => setRole(n.target.value)}/>
                            </Field>
                        </div>
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

type AddExperienceProps = {
    reloadExperience: () => Promise<void>;
};

function AddExperience({ reloadExperience }: AddExperienceProps) {
    const [organizationName, setOrganizationName] = useState("");
    const [location, setLocation] = useState("");
    const [position, setPosition] = useState("");
    const [role, setRole] = useState("");
    const [startedAt, setStartedAt] = useState("");
    const [endedAt, setEndedAt] = useState("");
    const [description, setDescription] = useState("");

    const submit = async () => {
        try {
            const response = await addExperienceApi(organizationName, location, position, role, startedAt, endedAt, description);

            if (response) {
                toast.success("Add Experience Successfully!");
                reloadExperience();
            }
        } catch (error: any) {
            toast.error(error);
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
                        <DialogTitle>Add education</DialogTitle>
                        <DialogDescription>
                            Add your education here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="organization-name-1">Organization Name</Label>
                            <Input id="organization-name-1" name="organization-name" value={organizationName} onChange={(n) => setOrganizationName(n.target.value)}/>
                        </Field>
                        <Field>
                            <Label htmlFor="location-1">Location</Label>
                            <Input id="location-1" name="location" value={location} onChange={(n) => setLocation(n.target.value)}/>
                        </Field>
                        <div className="flex flex-row gap-3">
                            <Field>
                                <Label htmlFor="position-1">Position</Label>
                                <Input id="position-1" name="position" value={position} onChange={(n) => setPosition(n.target.value)}/>
                            </Field>
                            
                            <Field>
                                <Label htmlFor="role-1">Role</Label>
                                <Input id="role-1" name="role" value={role} onChange={(n) => setRole(n.target.value)}/>
                            </Field>
                        </div>
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