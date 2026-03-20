import { addEducationApi, deleteEducationApi, getEducationApi, updateEducationApi } from "@/api";
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

type educationProps = {
    username: string,
    isOwner?: boolean,
}


export function Education({ username, isOwner = false }: educationProps) {
    const [educationsList, setEducationsList] = useState<any[]>([]);
    const [showAllEducation, setShowAllEducation] = useState(false);
    const collapseNumber = 3;
    const visibleEducation = showAllEducation ?  educationsList : educationsList.slice(0, collapseNumber);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const loadEducation = async () => {
        try {
            const response = await getEducationApi(username);
            setEducationsList(response.education as any[])
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

    const deleteEducation = async (educationId: string) => {
        try {
            const response = await deleteEducationApi(educationId);
            loadEducation();
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
        loadEducation()
    }, [username]);

    return (
        <div className="flex flex-col items-start justify-start rounded-md border shadow-md w-full gap-3 px-3 py-3">
            <div className="flex flex-row justify-between items-center w-full border-b-2 pb-2">
                <h1 className="font-bold text-xl">
                    Education
                </h1>
                
                {isOwner && (
                    <AddEducation reloadEducation={loadEducation}/>
                )}
            </div>

            {visibleEducation.map((education) => (
                <div className="flex flex-row items-start justify-start gap-3 border-b w-full pb-3" key={education.name}>
                    <img src="http://localhost:1234/storage/media/default_avatar.png" className="rounded-full w-10 aspect-square"/>

                    <div className="mt-2 w-full">
                        <h1 className="font-bold w-full">
                            {education.name}
                        </h1>

                        <h2 className="text-gray-500 w-full">
                            {education.location}
                        </h2>

                        <h2 className="w-full">
                            {`${education.major} - ${education.degree}`}
                        </h2>

                        <h2 className="w-full font-semibold">
                            {`${FormatDate(education.startedAt)} - ${FormatDate(education.endedAt)}`}
                        </h2>

                        <p className="whitespace-break-spaces">
                            {`${education.achievement}\n`}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <Button asChild className="bg-white hover:bg-gray-100 text-black border" onClick={() => deleteEducation(education.id)}>
                            <p>
                                Delete
                            </p>
                        </Button>

                        <EditEducation education={education} reloadEducation={loadEducation}/>
                    </div>
                </div>
            ))}

            {educationsList.length > collapseNumber && (
                <Button asChild className="bg-white hover:bg-gray-100 text-black p-0 w-full" onClick={() => setShowAllEducation((showAllEducation) => (!showAllEducation))}>
                    <p>
                        {showAllEducation ? "Show Less" : "Show More"}
                    </p>
                </Button>
            )}
        </div>
    );
}

type EditEducationProps = {
    education: any;
    reloadEducation: () => Promise<void>;
};

function EditEducation({ education, reloadEducation }: EditEducationProps) {
    const [schoolName, setSchoolName] = useState(education.name);
    const [location, setLocation] = useState(education.location);
    const [major, setMajor] = useState(education.major);
    const [degree, setDegree] = useState(education.degree);
    const [startedAt, setStartedAt] = useState(FormatDateInput(education.startedAt));
    const [endedAt, setEndedAt] = useState(FormatDateInput(education.endedAt));
    const [description, setDescription] = useState(education.achievement);

    const submit = async () => {
        try {
            const response = await updateEducationApi(education.id, schoolName, location, major, degree, startedAt, endedAt, description);

            if (response) {
                toast.success("Update Education Successfully!");
                reloadEducation();
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
            <DialogContent className="sm:max-w-[90%]">
                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}
                >
                    <DialogHeader>
                        <DialogTitle>Edit education</DialogTitle>
                        <DialogDescription>
                            Make changes to your education here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="school-name-1">School Name</Label>
                            <Input id="school-name-1" name="school-name" value={schoolName} onChange={(n) => setSchoolName(n.target.value)}/>
                        </Field>
                        <Field>
                            <Label htmlFor="location-1">Location</Label>
                            <Input id="location-1" name="location" value={location} onChange={(n) => setLocation(n.target.value)}/>
                        </Field>
                        <div className="flex flex-row gap-3">
                            <Field>
                                <Label htmlFor="major-1">Major</Label>
                                <Input id="major-1" name="major" value={major} onChange={(n) => setMajor(n.target.value)}/>
                            </Field>
                            
                            <Field>
                                <Label htmlFor="degree-1">Degree</Label>
                                <Input id="degree-1" name="degree" value={degree} onChange={(n) => setDegree(n.target.value)}/>
                            </Field>
                        </div>
                        <div className="flex flex-row gap-3">
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

type AddEducationProps = {
    reloadEducation: () => Promise<void>;
};

function AddEducation({ reloadEducation }: AddEducationProps) {
    const [schoolName, setSchoolName] = useState("");
    const [location, setLocation] = useState("");
    const [major, setMajor] = useState("");
    const [degree, setDegree] = useState("");
    const [startedAt, setStartedAt] = useState<string>();
    const [endedAt, setEndedAt] = useState<string>();
    const [description, setDescription] = useState("");

    const submit = async () => {
        try {
            const response = await addEducationApi(schoolName, location, major, degree, startedAt, endedAt, description);

            if (response) {
                toast.success("Add Education Successfully!");
                reloadEducation();
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
            <DialogContent className="sm:max-w-[90%]">
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
                            <Label htmlFor="name-1">School Name</Label>
                            <Input id="school-name-1" name="school-name" value={schoolName} onChange={(n) => setSchoolName(n.target.value)}/>
                        </Field>
                        <Field>
                            <Label htmlFor="location-1">Location</Label>
                            <Input id="location-1" name="location" value={location} onChange={(n) => setLocation(n.target.value)}/>
                        </Field>
                        <div className="flex flex-row gap-3">
                            <Field>
                                <Label htmlFor="major-1">Major</Label>
                                <Input id="major-1" name="major" value={major} onChange={(n) => setMajor(n.target.value)}/>
                            </Field>
                            
                            <Field>
                                <Label htmlFor="degree-1">Degree</Label>
                                <Input id="degree-1" name="degree" value={degree} onChange={(n) => setDegree(n.target.value)}/>
                            </Field>
                        </div>
                        <div className="flex flex-row gap-3">
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