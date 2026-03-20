import { Button } from "@/components/ui/button";
import { 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ComboboxBasic } from "@/components/ui/comboboxbasic";


function Course() {
    const { username } = useParams();
    
    return (
        <div className="flex flex-col items-center">
            <CreateCourse />
            <div className="flex flex-col items-center justify-between md:flex-row md:items-start md:flex-wrap max-w-350 w-full px-3">
                <div  className="flex flex-col rounded-md border shadow-md md:max-w-[49%] lg:max-w-[33%] my-2">
                    <img src={`${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`} className="w-full aspect-3/1 object-cover rounded-md" />

                    <a href="/" className="flex flex-col items-start justify-around w-full px-2 py-2">
                        <p className="font-bold">
                            Title
                        </p>
                        <p className="flex flex-col items-start justify-around w-full pb-2 border-b break-all">
                            Descriptionffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                        </p>

                        <div className="flex flex-row justify-between w-full pt-1">
                            <p>
                                Rating
                            </p>
                            <p>
                                Number of rating
                            </p>
                        </div>
                    </a>

                    <DeleteCourse courseId="1"/>
                </div>
            </div>
        </div>
    );
}

export default Course;

type DeleteCourseProp = {
    courseId: string;
}

function DeleteCourse ({ courseId }: DeleteCourseProp) {
    const deleteCourse = async () => {

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="">
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center">
                <DialogHeader className="flex flex-fol items-center">
                    <DialogTitle>
                        Delete course {courseId}
                    </DialogTitle>
                    <DialogDescription>
                        You could not undo you this action.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <DialogClose asChild>
                        <Button className="bg-main hover:bg-main-hover" onClick={() => deleteCourse()}>
                            Delete
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    ) 
}

function CreateCourse () {
    const currencies = [
        'AUD',
        'VND',
        'USD',
    ];
    const [currency, setCurrency] = useState("");

    const submit = () => {

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-main hover:bg-main-hover text-white hover:text-white">
                    Create a course
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
                        <DialogTitle>Create new course</DialogTitle>
                        <DialogDescription>
                            Make changes to your education here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="tital-1">Title</Label>
                            <Input id="tital-1" name="tital" defaultValue={"Course Title"}/>
                        </Field>
                        <Field>
                            <Label htmlFor="description-1">Description</Label>
                            <Input id="description-1" name="description" defaultValue={"Description"}/>
                        </Field>
                        <div className="flex flex-row gap-3">
                            <Field>
                                <Label htmlFor="price-1">Price</Label>
                                <Input id="price-1" name="price" defaultValue={"major"}/>
                            </Field>
                            
                            <Field>
                                <Label htmlFor="currency-1">Currency</Label>
                                <ComboboxBasic values={currencies} value={currency} setValue={setCurrency} />
                            </Field>
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