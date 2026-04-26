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
import { addCourseApi, deleteCourseApi, getCoursesApi, udpateCourseApi, uploadPhotoApi } from "@/api";


function Courses() {
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
        <div className="flex w-full max-w-350 flex-col items-center gap-3 px-2">
            <div className="flex w-full items-center rounded-md border px-3 py-2 shadow-sm">
                <h1 className="text-xl font-bold">
                    Courses
                </h1>
            </div>

            {isOwner && (
                <CreateCourse
                    reloadCourses={loadCourses}
                    className="w-full h-full text-3xl"
                />
            )}

            <div className="flex flex-col items-center justify-around md:flex-row md:items-start md:flex-wrap w-full px-3">

                {courses?.map((course) => (
                    <CourseComponent course={course} isOwner={isOwner} loadCourses={loadCourses} key={course.title}/>
                ))}
            
            </div>
        </div>
    );
}

export default Courses;

type CourseComponentProp = {
    course: any,
    isOwner: boolean,
    loadCourses: () => Promise<void>,
}

function CourseComponent ({ course, isOwner, loadCourses }: CourseComponentProp) {
    const [showAllDescription, setShowAllDescription] = useState(false);
    const description = course.description ?? "";
    const shortenedSize = 50;
    // Don't show "Show More"/"Show Less" if description is not long enough
    const isLong = description.length >= 50;
    const visibleDescription = showAllDescription ? description : description.slice(0, shortenedSize);
    const courseLink = `/course/${course.id}`;
    const thumbnailUrl = course.thumbnail?.name
        ? `${import.meta.env.VITE_PHOTO_STORAGE}${course.thumbnail.name}`
        : `${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`;

    const shortenCount = (count: number) => {
        let shorten = "";

        if (count >= 1000000) {
            const millionCount = count/1000000;
            shorten = millionCount.toFixed(1) + "M";
        }
        else if (count >= 1000) {
            const thousandCount = count/1000;
            shorten = thousandCount.toFixed(1) + "K";
        }
        else {
            shorten = count.toString();
        }

        return shorten;
    }

    const formatLastUpdated = (dateString?: string) => {
        if (!dateString) return "Never";

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "Never";
        }

        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    return (
        <div className="flex flex-col rounded-md border shadow-md md:max-w-[49%] lg:max-w-[33%] my-2">
            <a href={courseLink} className="w-full aspect-3/1 object-cover rounded-md">
                <img src={thumbnailUrl} className="w-full aspect-3/1 object-cover rounded-md" />
            </a>

            <div className="flex flex-col items-start justify-around w-full px-2 py-2">
                <a href={courseLink} className="font-bold hover:underline">
                    {course.title}
                </a>
                <p className="w-full pb-2 border-b wrap-break-word">
                    {visibleDescription}
                    
                    {isLong && (
                        <span
                            className="font-semibold text-main hover:text-main-hover hover:underline cursor-pointer ml-1"
                            onClick={() => setShowAllDescription(!showAllDescription)}
                        >
                            {showAllDescription ? "Show Less" : " Show More"}
                        </span>
                    )}
                </p>

                <div className="grid w-full grid-cols-4 gap-2 border-t pt-2 text-center text-sm">
                    <div className="flex flex-col">
                        <span className="font-semibold">{course.rating} ⭐</span>
                        <span className="text-xs uppercase text-gray-500">{shortenCount(course.ratingCount ?? 0)} Ratings</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">{course.price ?? 0}</span>
                        <span className="text-xs uppercase text-gray-500">{course.currency ?? "AUD"}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">{shortenCount(course.postsCount ?? 0)}</span>
                        <span className="text-xs uppercase text-gray-500">Posts</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">{shortenCount(course.subscribersCount ?? 0)}</span>
                        <span className="text-xs uppercase text-gray-500">Subscribers</span>
                    </div>
                </div>

                <div className="w-full pt-4 text-center text-sm">
                    <span className="ml-2">Last Update: </span>
                    <span className="font-semibold">{formatLastUpdated(course.lastUpdated ?? course.createdAt)}</span>
                </div>
            </div>

            {isOwner && (
                <div className="flex flex-row w-full">
                    <UpdateCourse course={course} reloadCourses={loadCourses} className="flex-1 rounded-r-none"/>
                    <DeleteCourse course={course} reloadCourses={loadCourses} className="flex-1 rounded-l-none"/>
                </div>  
            )}
        </div>
    )
}

type DeleteCourseProp = {
    course: any;
    reloadCourses: () => Promise<void>;
    className?: string;
}

function DeleteCourse ({ course, reloadCourses, className }: DeleteCourseProp) {
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
                <Button variant="outline" className={className}>
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
    className?: string;
}

function CreateCourse ({ reloadCourses, className }: CreateCourseProp) {
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
                <Button variant="outline" className={className}>
                    +
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
                                <Input 
                                    id="price-1" 
                                    name="price" 
                                    type="number" 
                                    min={0} 
                                    value={price} 
                                    onChange={(n) => {
                                        const value = Math.max(0, Number(n.target.value));
                                        setPrice(Number(value))   
                                    }}
                                />
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

type UpdateCourseProp = {
    course: any;
    reloadCourses: () => Promise<void>;
    className?: string;
}

function UpdateCourse ({ course, reloadCourses, className }: UpdateCourseProp) {
    const currencies = [
        'AUD',
        'VND',
        'USD',
    ];
    const [currency, setCurrency] = useState(course?.currency);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState(course?.title);
    const [description, setDescription] = useState<string>(course?.description);
    const [price, setPrice] = useState(course?.price);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    const updateCourse = async () => {
        try {
            if (title == "") {
                toast.error("Please add title for the course");
                throw new Error("Title not found");
            }

            let thumbnailId = course?.thumbnailId;

            if (thumbnailFile) {
                const photo = await uploadPhotoApi(thumbnailFile);
                thumbnailId = photo.id;
            }

            const response = await udpateCourseApi(course?.id, title, description, price, currency, thumbnailId);

            if (!response) {
                throw new Error("Couldn't update the course course");
            }
            setThumbnailFile(null);
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
                <Button variant="outline" className={className}>
                    Update
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90%] pointer-events-auto">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateCourse();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>
                            Update Course {course?.title}
                        </DialogTitle>
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
                                <Input 
                                    id="price-1" 
                                    name="price" 
                                    type="number" 
                                    min={0} 
                                    value={price} 
                                    onChange={(n) => {
                                        const value = Math.max(0, Number(n.target.value));
                                        setPrice(Number(value))   
                                    }}
                                />
                            </Field>
                            
                            <Field>
                                <Label htmlFor="currency-1">Currency</Label>
                                <ComboboxBasic values={currencies} value={currency} setValue={setCurrency} />
                            </Field>
                        </div>
                        <Field>
                            <Label htmlFor="course-thumbnail-list">Thumbnail</Label>
                            <Input id="course-thumbnail-list" type="file" accept="image/*" onChange={(event) => setThumbnailFile(event.target.files?.[0] ?? null)} />
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="pt-3">
                        <DialogClose asChild>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit">
                                Save
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                    </form>
            </DialogContent>
        </Dialog>
    )
}
