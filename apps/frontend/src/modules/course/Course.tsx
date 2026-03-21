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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ComboboxBasic } from "@/components/ui/comboboxBasic";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { addCourseApi, deleteCourseApi, getCoursesApi } from "@/api";


function Course() {
    const { username } = useParams();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [courses, setCourses] = useState<any[]>([]);
    const [isOwner, setIsOwner] = useState(false);

    const loadCourses = async () => {
        try {
            if (!username) {
                throw new Error("No username found");
            }
            const response = await getCoursesApi(username);
            setCourses(response.course);
            setIsOwner(response.isOwner);
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
        loadCourses();
    }, [username]);

    return (
        <div className="flex flex-col items-center max-w-350 w-full">
            
            {isOwner &&
                <CreateCourse reloadCourses={loadCourses}/>
            }

            <div className="flex flex-col items-center justify-around md:flex-row md:items-start md:flex-wrap w-full px-3">

                {courses?.map((course) => (
                    <CourseComponent course={course} isOwner={isOwner} loadCourses={loadCourses} key={course.title}/>
                ))}
            
            </div>
        </div>
    );
}

export default Course;

type CourseComponentProp = {
    course: any,
    isOwner: boolean,
    loadCourses: () => Promise<void>,
}

function CourseComponent ({ course, isOwner, loadCourses }: CourseComponentProp) {
    const [showAllDescription, setShowAllDescription] = useState(false);
    const description = course.description;
    const visibleDescription = showAllDescription ? description : description.slice(0, 50);

    const shortenRatingCount = (ratingCount: number) => {
        let shorten = "";

        if (ratingCount >= 1000000) {
            const millionRating = ratingCount/1000000;
            shorten = millionRating.toFixed(1) + "M";
        }
        else if (ratingCount >= 1000) {
            const thousandRating = ratingCount/1000;
            shorten = thousandRating.toFixed(1) + "K";
        }
        else {
            shorten = ratingCount.toString();
        }


        return shorten;
    }

    return (
        <div className="flex flex-col rounded-md border shadow-md md:max-w-[49%] lg:max-w-[33%] my-2">
            <a href="/" className="w-full aspect-3/1 object-cover rounded-md">
                <img src={`${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`} className="w-full aspect-3/1 object-cover rounded-md" />
            </a>

            <div className="flex flex-col items-start justify-around w-full px-2 py-2">
                <a href="/" className="font-bold hover:underline">
                    {course.title}
                </a>
                <p className="w-full pb-2 border-b wrap-break-word">
                    {visibleDescription}
                    <span
                        className="font-semibold text-main hover:text-main-hover hover:underline cursor-pointer ml-1"
                        onClick={() => setShowAllDescription(!showAllDescription)}
                    >
                        {showAllDescription ? " Show Less" : "Show More"}
                    </span>
                </p>

                <div className="flex flex-row justify-between w-full pt-1">
                    <p>
                        {`${course.rating} ⭐`}
                    </p>
                    <p>
                        {`${shortenRatingCount(course.ratingCount)} Ratings`}
                    </p>
                </div>
            </div>

            {isOwner && (
                <DeleteCourse course={course} reloadCourses={loadCourses}/>
            )}
        </div>
    )
}

type DeleteCourseProp = {
    course: any;
    reloadCourses: () => Promise<void>;
}

function DeleteCourse ({ course, reloadCourses }: DeleteCourseProp) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const deleteCourse = async () => {
        try {
            const response = await deleteCourseApi(course.id);

            if (!response) {
                throw new Error("Couldn't delete the course");
            }

            reloadCourses();
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
                        Delete course "{course.title}"
                    </DialogTitle>
                    <DialogDescription>
                        You could not undo this action.
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

type CreateCourseProp = {
    reloadCourses: () => Promise<void>;
}

function CreateCourse ({ reloadCourses }: CreateCourseProp) {
    const currencies = [
        'AUD',
        'VND',
        'USD',
    ];
    const [currency, setCurrency] = useState("AUD");
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState(0);

    const createCourse = async () => {
        try {
            if (title == "") {
                toast.error("Please add title for the course");
                throw new Error("Title not found");
            }

            const response = await addCourseApi(title, description, price, currency);

            if (!response) {
                throw new Error("Couldn't add new course");
            }

            setTitle("");
            setDescription("");
            setPrice(0);

            reloadCourses();
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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-main hover:bg-main-hover text-white hover:text-white rounded-full">
                    Create a course
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90%] pointer-events-auto">
                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    createCourse();
                }}
                >
                    <DialogHeader>
                        <DialogTitle>Create new course</DialogTitle>
                        <DialogDescription>
                            Make changes to your course here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="title-1">Title</Label>
                            <Input id="title-1" name="title" value={title} onChange={(n) => setTitle(n.target.value)}/>
                        </Field>
                        <Field>
                            <Label htmlFor="description-1">Description</Label>
                            <Input id="description-1" name="description" value={description} onChange={(n) => setDescription(n.target.value)}/>
                        </Field>
                        <div className="flex flex-row gap-3">
                            <Field>
                                <Label htmlFor="price-1">Price</Label>
                                <Input id="price-1" name="price" type="number" value={price} onChange={(n) => setPrice(Number(n.target.value))}/>
                            </Field>
                            
                            <Field>
                                <Label htmlFor="currency-1">Currency</Label>
                                <ComboboxBasic values={currencies} value={currency} setValue={setCurrency} />
                            </Field>
                        </div>
                    </FieldGroup>
                    <DialogFooter className="pt-3">
                        <DialogClose asChild>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit">
                                Create
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                    </form>
            </DialogContent>
        </Dialog>
    )
}
