import { Button } from "@/shared/components/ui/button";
import { 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "@/shared/components/ui/dialog";
import { Field, FieldGroup } from "@/shared/components/ui/field";
import { Label } from "@/shared/components/ui/label"
import { Input } from "@/shared/components/ui/input"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ComboboxBasic } from "@/shared/components/ui/comboboxBasic";
import { useAuth } from "@/providers";
import toast from "react-hot-toast";
import { addCourseApi, deleteCourseApi, getCoursesApi, udpateCourseApi, uploadPhotoApi } from "@/features/courses/api";
import { buildMediaUrl, DEFAULT_COURSE_THUMBNAIL_URL } from "@/shared/lib/media";
import LoadingScreen from "@/shared/components/LoadingScreen";
import { TagSelector, getTagNames } from "@/features/tags";

const COURSES_PAGE_SIZE = 5;


function Courses() {
    const { username } = useParams();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [courses, setCourses] = useState<any[]>([]);
    const [isOwner, setIsOwner] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const loadCourses = async (reset = true) => {
        try {
            if (!username) {
                throw new Error("No username found");
            }

            if (reset) {
                setIsLoading(true);
            } else {
                setIsLoadingMore(true);
            }

            const response = await getCoursesApi(username, {
                offset: reset ? 0 : courses.length,
                limit: COURSES_PAGE_SIZE,
            });
            setCourses((currentCourses) => reset ? response.course : [...currentCourses, ...response.course]);
            setHasMore(!!response.hasMore);
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
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }

    useEffect(() => {
        setCourses([]);
        setHasMore(true);
        loadCourses(true);
    }, [username]);

    useEffect(() => {
        const target = loadMoreRef.current;

        if (!target || !hasMore || isLoading || isLoadingMore) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0]?.isIntersecting) {
                loadCourses(false);
            }
        }, { rootMargin: "200px" });

        observer.observe(target);

        return () => observer.disconnect();
    }, [hasMore, isLoading, isLoadingMore, courses.length, username]);

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
                {isLoading ? (
                    <LoadingScreen label="Loading courses..." />
                ) : courses.length === 0 ? (
                    <div className="w-full rounded-md border p-6 text-center text-gray-500">
                        No courses yet.
                    </div>
                ) : null}

                {courses?.map((course) => (
                    <CourseComponent course={course} isOwner={isOwner} loadCourses={loadCourses} key={course.title}/>
                ))}

                <div ref={loadMoreRef} className="w-full">
                    {isLoadingMore && <LoadingScreen label="Loading more courses..." />}
                    {!hasMore && courses.length > 0 && (
                        <div className="rounded-md border p-3 text-center text-sm text-gray-500">
                            No more courses.
                        </div>
                    )}
                </div>
            
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
    const thumbnailUrl = buildMediaUrl(course.thumbnail?.name) || DEFAULT_COURSE_THUMBNAIL_URL;

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
                {getTagNames(course).length > 0 && (
                    <div className="flex flex-wrap gap-1 py-2">
                        {getTagNames(course).slice(0, 6).map((tag: string) => (
                            <span key={tag} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

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
    const [tags, setTags] = useState<string[]>([]);
    const [showPayoutRequired, setShowPayoutRequired] = useState(false);
    const [open, setOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const createCourse = async () => {
        if (title.trim() === "") {
            toast.error("Please add title for the course");
            return;
        }

        setIsCreating(true);

        try {
            const response = await addCourseApi(title, description, price, currency, tags);

            if (!response) {
                throw new Error("Couldn't add new course");
            }

            setTitle("");
            setDescription("");
            setPrice(0);
            setTags([]);

            await reloadCourses();
            toast.success("Course created successfully");
            setOpen(false);
        } catch (error: any) {
            if (error.response?.data?.code === "PAYOUT_ACCOUNT_REQUIRED") {
                setShowPayoutRequired(true);
                return;
            }
            if (error.response?.status === 401) {
                console.error("Token Expired");
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login')
            // handle logout or redirect
            }
            toast.error(error.response?.data?.message ?? "Couldn't create course");
        } finally {
            setIsCreating(false);
        }
    }

    return (
        <>
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!isCreating) {
                    setOpen(nextOpen);
                }
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline" className={className}>
                    +
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90%] pointer-events-auto">
                {isCreating ? (
                    <LoadingScreen label="Creating course..." />
                ) : (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        void createCourse();
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
                        <Field>
                            <TagSelector value={tags} onChange={setTags} suggestionText={`${title}\n${description}`} />
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
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
                )}
            </DialogContent>
        </Dialog>
        <Dialog open={showPayoutRequired} onOpenChange={setShowPayoutRequired}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Set up payouts first</DialogTitle>
                    <DialogDescription>
                        Paid courses require a completed payout account so subscription revenue has a verified destination.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowPayoutRequired(false)}>Keep this course free</Button>
                    <Button className="bg-main hover:bg-main-hover" onClick={() => navigate("/settings/payout")}>
                        Register payout account
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
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
    const [tags, setTags] = useState<string[]>(getTagNames(course));

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

            const response = await udpateCourseApi(course?.id, title, description, price, currency, thumbnailId, tags);

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
                        <Field>
                            <TagSelector value={tags} onChange={setTags} suggestionText={`${title}\n${description}`} />
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
