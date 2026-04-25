import { deleteCourseApi, getCourseApi, getProfileByIdApi, getSubscriptionApi, subscribeCourseApi, udpateCourseApi } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileIcon, BarChartHorizontalIcon, MoreVerticalIcon } from "lucide-react";
import Files from './Files';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Posts } from "./Posts";

function Course () {
    const { id } = useParams();
    const { logout, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const [rating, setRating] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    const [subscribersCount, setSubscribersCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [currency, setCurrency] = useState("AUD");
    const [description, setDescription] = useState("");
    // There are 2 view modes for now post/file
    const [viewMode, setViewMode] = useState("post");
    const [course, setCourse] = useState<any>();
    const [owner, setOwner] = useState<any>();
    const [ownerAvatar, setOwnerAvatar] = useState(`${import.meta.env.VITE_PHOTO_STORAGE}default_avatar.png`);
    const [postsCount, setPostsCount] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);
    
    const loadCourse = async () => {
        try {
            if (!id) {
                throw Error('id not found');
            }

            const response = await getCourseApi(id);
            const course = response.course;
            const ownerResponse = await getProfileByIdApi(course.userId);
            setIsOwner(response.isOwner);
            setTitle(course.title);
            setRating(course.rating);
            setRatingCount(course.ratingCount);
            setSubscribersCount(course.subscribersCount ?? 0);
            setPrice(course.price ?? 0);
            setCurrency(course.currency ?? "AUD");
            setDescription(course.description);
            setCourse(course);
            setOwner(ownerResponse.profile);
            setOwnerAvatar(ownerResponse.profile.avatarUrl || `${import.meta.env.VITE_PHOTO_STORAGE}default_avatar.png`);
            setPostsCount(course.postsCount ?? 0);

            if (!response.isOwner && isLoggedIn) {
                const subscriptionResponse = await getSubscriptionApi(course.id);
                setIsSubscribed(subscriptionResponse.isSubscribed);
            } else {
                setIsSubscribed(false);
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

    useEffect(() => {
        loadCourse();
    }, [id, isLoggedIn])

    return (
        <div className="flex flex-col items-center justify-start px-2 gap-3 w-full max-w-350">
            <div className="relative flex flex-col items-center justify-start rounded-md border shadow-md w-full gap-3">
                {isOwner && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="absolute right-2 top-2 bg-white/80 hover:bg-white">
                                <MoreVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <UpdateCourseAction
                                    course={course}
                                    reloadCourse={loadCourse}
                                    className="w-full justify-start border-0 shadow-none"
                                />
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <DeleteCourseAction
                                    course={course}
                                    owner={owner}
                                    className="w-full justify-start border-0 text-red-600 shadow-none hover:text-red-700"
                                />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                <img src={`${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`} className="w-full aspect-3/1 object-cover rounded-md" />
                
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4">
                    <h1 className="font-bold text-xl whitespace-break-spaces">
                        {`${title} `}
                    </h1>

                    <h2 className="text-lg">
                        {`${rating}⭐ ${shortenRatingCount(ratingCount)} Ratings`}
                    </h2>
                    <span className="text-lg font-semibold">
                        {price > 0 ? `Price: ${price} ${currency}` : "Free"}
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center gap-3 px-4">
                    <button
                        type="button"
                        className="flex items-center gap-3 rounded-md px-2 py-1 text-left hover:bg-gray-100"
                        onClick={() => owner?.username && navigate(`/profile/${owner.username}`)}
                    >
                        <img
                            src={ownerAvatar}
                            className="size-12 rounded-full border-2 object-cover"
                        />
                        <span className="flex flex-col">
                            <span className="text-xs font-medium uppercase text-gray-500">
                                Owner
                            </span>
                            <span className="font-semibold text-gray-900 hover:underline">
                                {[owner?.firstname, owner?.middlename, owner?.lastname].filter(Boolean).join(" ")}
                            </span>
                        </span>
                    </button>

                    <div className="flex items-center justify-center gap-6 border-t px-6 pt-3">
                        <div className="flex flex-col items-center">
                            <span className="text-lg font-semibold text-gray-900">
                                {postsCount}
                            </span>
                            <span className="text-xs font-medium uppercase text-gray-500">
                                Post{postsCount === 1 ? "" : "s"}
                            </span>
                        </div>

                        <div className="h-8 border-l" />

                        <div className="flex flex-col items-center">
                            <span className="text-lg font-semibold text-gray-900">
                                {subscribersCount}
                            </span>
                            <span className="text-xs font-medium uppercase text-gray-500">
                                Subscriber{subscribersCount === 1 ? "" : "s"}
                            </span>
                        </div>
                    </div>
                </div>

                <p className="px-4 pb-2">
                    {description}
                </p>

                <div className="flex flex-wrap justify-center gap-2 px-4 pb-2">
                    {!isOwner && (
                        <SubscribeCourseAction
                            course={course}
                            isSubscribed={isSubscribed}
                            reloadCourse={loadCourse}
                        />
                    )}
                </div>

                <div className="flex flex-row w-full">
                    <Button
                        onClick={() => setViewMode('post')}
                        disabled={viewMode === 'post'}
                        className={`flex flex-col items-center px-4 py-2 rounded border-t flex-1
                            ${viewMode === "post"
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-white text-black hover:bg-gray-100"}
                            `}
                    >
                        <BarChartHorizontalIcon />
                    </Button>

                    <Button
                        onClick={() => setViewMode('file')}
                        disabled={viewMode === 'file'}
                        className={`flex flex-col items-center px-4 py-2 rounded border-t flex-1
                            ${viewMode === "file"
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-white text-black hover:bg-gray-100"}
                            `}
                    >
                        <FileIcon/>
                    </Button>
                </div>
            </div>

            {viewMode === 'file' && (<Files course={course}/>)}
            {viewMode === 'post' && (<Posts course={course} reloadCourse={loadCourse}/>)}
        </div>
    )
}

export default Course;

function UpdateCourseAction({
    course,
    reloadCourse,
    className = "",
}: {
    course: any;
    reloadCourse: () => Promise<void>;
    className?: string;
}) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState(course?.title ?? "");
    const [description, setDescription] = useState(course?.description ?? "");
    const [price, setPrice] = useState(course?.price ?? 0);
    const [currency, setCurrency] = useState(course?.currency ?? "AUD");

    const updateCourse = async () => {
        try {
            if (!title.trim()) {
                toast.error("Please add title for the course");
                return;
            }

            const response = await udpateCourseApi(course.id, title, description, price, currency);

            if (!response) {
                throw new Error("Couldn't update the course");
            }

            toast.success("Course updated");
            await reloadCourse();
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login');
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
            <DialogContent>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        updateCourse();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Update</DialogTitle>
                        <DialogDescription>
                            Update the title, description, and subscription price.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup className="py-4">
                        <Field>
                            <Label htmlFor="course-title">Title</Label>
                            <Input id="course-title" value={title} onChange={(event) => setTitle(event.target.value)} />
                        </Field>

                        <Field>
                            <Label htmlFor="course-description">Description</Label>
                            <Input id="course-description" value={description} onChange={(event) => setDescription(event.target.value)} />
                        </Field>

                        <div className="grid grid-cols-2 gap-3">
                            <Field>
                                <Label htmlFor="course-price">Price</Label>
                                <Input
                                    id="course-price"
                                    type="number"
                                    min={0}
                                    value={price}
                                    onChange={(event) => setPrice(Math.max(0, Number(event.target.value)))}
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="course-currency">Currency</Label>
                                <select
                                    id="course-currency"
                                    value={currency}
                                    onChange={(event) => setCurrency(event.target.value)}
                                    className="h-9 rounded-md border bg-transparent px-3 text-sm"
                                >
                                    <option value="AUD">AUD</option>
                                    <option value="USD">USD</option>
                                    <option value="VND">VND</option>
                                </select>
                            </Field>
                        </div>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" className="bg-main hover:bg-main-hover">
                                Save
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function DeleteCourseAction({
    course,
    owner,
    className = "",
}: {
    course: any;
    owner: any;
    className?: string;
}) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [confirmationText, setConfirmationText] = useState("");
    const [isSecondStep, setIsSecondStep] = useState(false);

    const deleteCourse = async () => {
        try {
            const response = await deleteCourseApi(course.id);

            if (!response) {
                throw new Error("Couldn't delete the course");
            }

            toast.success("Course deleted");
            navigate(owner?.username ? `/profile/${owner.username}` : "/");
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login');
            }
            throw error;
        }
    }

    return (
        <Dialog
            onOpenChange={(open) => {
                if (!open) {
                    setConfirmationText("");
                    setIsSecondStep(false);
                }
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline" className={className}>
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete "{course?.title}"</DialogTitle>
                    <DialogDescription>
                        This will permanently delete the course and its course posts.
                    </DialogDescription>
                </DialogHeader>

                {!isSecondStep ? (
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button className="bg-red-600 text-white hover:bg-red-700" onClick={() => setIsSecondStep(true)}>
                            Continue
                        </Button>
                    </DialogFooter>
                ) : (
                    <div className="flex flex-col gap-4">
                        <Field>
                            <Label htmlFor="delete-course-confirmation">
                                Type DELETE to confirm
                            </Label>
                            <Input
                                id="delete-course-confirmation"
                                value={confirmationText}
                                onChange={(event) => setConfirmationText(event.target.value)}
                            />
                        </Field>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsSecondStep(false)}>
                                Back
                            </Button>
                            <DialogClose asChild>
                                <Button
                                    className="bg-red-600 text-white hover:bg-red-700"
                                    disabled={confirmationText !== "DELETE"}
                                    onClick={deleteCourse}
                                >
                                    Delete permanently
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

function SubscribeCourseAction({
    course,
    isSubscribed,
    reloadCourse,
}: {
    course: any;
    isSubscribed: boolean;
    reloadCourse: () => Promise<void>;
}) {
    const { logout, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");

    const subscribeCourse = async () => {
        try {
            if (!isLoggedIn) {
                toast.error("Please log in to subscribe");
                navigate('/login');
                return;
            }

            if (!cardNumber.trim() || !cardName.trim() || !expiry.trim() || !cvc.trim()) {
                toast.error("Please enter dummy card details");
                return;
            }

            const response = await subscribeCourseApi(course.id);

            if (!response) {
                throw new Error("Couldn't subscribe to course");
            }

            toast.success("Subscribed successfully");
            await reloadCourse();
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login');
            }
            throw error;
        }
    }

    if (isSubscribed) {
        return (
            <Button variant="outline" disabled>
                Subscribed
            </Button>
        )
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-main hover:bg-main-hover">
                    Subscribe
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        subscribeCourse();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Subscribe to {course?.title}</DialogTitle>
                        <DialogDescription>
                            Dummy payment only. No real card will be charged.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-2 text-sm font-medium">
                        Total: {course?.price > 0 ? `${course.price} ${course.currency}` : "Free"}
                    </div>

                    <FieldGroup className="py-4">
                        <Field>
                            <Label htmlFor="card-name">Name on card</Label>
                            <Input id="card-name" value={cardName} onChange={(event) => setCardName(event.target.value)} />
                        </Field>
                        <Field>
                            <Label htmlFor="card-number">Card number</Label>
                            <Input id="card-number" inputMode="numeric" value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} />
                        </Field>
                        <div className="grid grid-cols-2 gap-3">
                            <Field>
                                <Label htmlFor="card-expiry">Expiry</Label>
                                <Input id="card-expiry" placeholder="MM/YY" value={expiry} onChange={(event) => setExpiry(event.target.value)} />
                            </Field>
                            <Field>
                                <Label htmlFor="card-cvc">CVC</Label>
                                <Input id="card-cvc" inputMode="numeric" value={cvc} onChange={(event) => setCvc(event.target.value)} />
                            </Field>
                        </div>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" className="bg-main hover:bg-main-hover">
                                Pay and subscribe
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
