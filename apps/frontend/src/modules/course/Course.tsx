import { deleteCourseApi, getCourseApi, getProfileByIdApi, getSubscriptionApi, subscribeCourseApi, udpateCourseApi, uploadCourseThumbnailApi } from "@/api";
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
import { FileIcon, BarChartHorizontalIcon, MoreVerticalIcon, CameraIcon, StarIcon } from "lucide-react";
import Files from './Files';
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Posts } from "./Posts";
import { Reviews } from "./Reviews";
import LoadingScreen from "@/components/LoadingScreen";

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
    // There are 3 view modes for now post/file/review
    const [viewMode, setViewMode] = useState("post");
    const [course, setCourse] = useState<any>();
    const [owner, setOwner] = useState<any>();
    const [ownerAvatar, setOwnerAvatar] = useState(`${import.meta.env.VITE_PHOTO_STORAGE}default_avatar.png`);
    const [postsCount, setPostsCount] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscription, setSubscription] = useState<any>(null);
    const [lastUpdated, setLastUpdated] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState(`${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`);
    const [isLoading, setIsLoading] = useState(true);

    const getPhotoUrl = (value?: string) => {
        if (!value) return "";

        if (value.startsWith("http")) {
            return value;
        }

        return `${import.meta.env.VITE_PHOTO_STORAGE}${value}`;
    }
    
    const loadCourse = async () => {
        try {
            setIsLoading(true);
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
            setOwnerAvatar(
                getPhotoUrl(ownerResponse.profile.avatarUrl || ownerResponse.profile.avatar?.name)
                    || `${import.meta.env.VITE_PHOTO_STORAGE}default_avatar.png`
            );
            setPostsCount(course.postsCount ?? 0);
            setLastUpdated(course.lastUpdated ?? course.createdAt ?? "");
            setThumbnailUrl(
                course.thumbnail?.name
                    ? `${import.meta.env.VITE_PHOTO_STORAGE}${course.thumbnail.name}`
                    : `${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`
            );

            if (!response.isOwner && isLoggedIn) {
                const subscriptionResponse = await getSubscriptionApi(course.id);
                setIsSubscribed(subscriptionResponse.isSubscribed);
                setSubscription(subscriptionResponse.subscription ?? null);
            } else {
                setIsSubscribed(false);
                setSubscription(null);
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
        } finally {
            setIsLoading(false);
        }
    }

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

    const formatLastUpdated = (dateString: string) => {
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

    useEffect(() => {
        loadCourse();
    }, [id, isLoggedIn])

    const copyLink = async () => {
        const link = `${window.location.origin}/course/${id}`;

        await navigator.clipboard.writeText(link);
        toast.success("Link copied to clipboard!");
    }

    if (isLoading) {
        return (
            <div className="flex w-full max-w-350 flex-col items-center gap-3 px-2">
                <LoadingScreen label="Loading course..." />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start px-2 gap-3 w-full max-w-350">
            <div className="relative flex flex-col items-center justify-start rounded-md border shadow-md w-full gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="absolute z-1 right-2 top-2 bg-white/80 hover:bg-white">
                            <MoreVerticalIcon />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start border-0 font-normal shadow-none"
                                onClick={copyLink}
                            >
                                Copy Link
                            </Button>
                        </DropdownMenuItem>

                        {isOwner && (
                            <div className="border-t">
                                <DropdownMenuItem asChild>
                                    <UpdateCourseAction
                                        course={course}
                                        reloadCourse={loadCourse}
                                        className="w-full justify-start border-0 font-normal shadow-none"
                                    />
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <DeleteCourseAction
                                        course={course}
                                        owner={owner}
                                        className="w-full justify-start border-0 font-normal text-red-600 shadow-none hover:text-red-700"
                                    />
                                </DropdownMenuItem>
                            </div>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="relative w-full">
                    <img src={thumbnailUrl} className="w-full aspect-3/1 object-cover rounded-md" />
                    {isOwner && course?.id && (
                        <CourseThumbnailAction
                            courseId={course.id}
                            reloadCourse={loadCourse}
                        />
                    )}
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4">
                    <h1 className="font-bold text-xl whitespace-break-spaces">
                        {`${title} `}
                    </h1>
                </div>

                <p className="px-4 pb-2 max-w-[60%]">
                    {description}
                </p>

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

                    <div className="grid w-full grid-cols-4 gap-2 border-t pt-2 text-center text-sm">
                        <div className="flex flex-col">
                            <span className="font-semibold">{rating} ⭐</span>
                            <span className="text-xs uppercase text-gray-500">{shortenCount(ratingCount ?? 0)} Ratings</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">{price ?? 0}</span>
                            <span className="text-xs uppercase text-gray-500">{currency ?? "AUD"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">{shortenCount(postsCount ?? 0)}</span>
                            <span className="text-xs uppercase text-gray-500">Posts</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">{shortenCount(subscribersCount ?? 0)}</span>
                            <span className="text-xs uppercase text-gray-500">Subscribers</span>
                        </div>
                    </div>

                    <div className="w-full pt-4 text-center text-sm">
                        <span className="ml-2">Last Update: </span>
                        <span className="font-semibold">{formatLastUpdated(lastUpdated)}</span>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 px-4 pb-2">
                    {!isOwner && isLoggedIn && (
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
                        className={`flex flex-col items-center px-4 py-2 rounded border flex-1
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
                        className={`flex flex-col items-center px-4 py-2 rounded border flex-1
                            ${viewMode === "file"
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-white text-black hover:bg-gray-100"}
                            `}
                    >
                        <FileIcon/>
                    </Button>

                    <Button
                        onClick={() => setViewMode('review')}
                        disabled={viewMode === 'review'}
                        className={`flex flex-col items-center px-4 py-2 rounded border flex-1
                            ${viewMode === "review"
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-white text-black hover:bg-gray-100"}
                            `}
                    >
                        <StarIcon />
                    </Button>
                </div>
            </div>

            {viewMode === 'file' && course?.folderId && (<Files rootFolderId={course.folderId}/>)}
            {viewMode === 'post' && (<Posts course={course} reloadCourse={loadCourse}/>)}
            {viewMode === 'review' && (
                <Reviews
                    course={course}
                    isLoggedIn={isLoggedIn}
                    isSubscribed={isSubscribed}
                    isOwner={isOwner}
                    subscription={subscription}
                    reloadCourse={loadCourse}
                />
            )}
        </div>
    )
}

export default Course;

function CourseThumbnailAction({
    courseId,
    reloadCourse,
}: {
    courseId: string;
    reloadCourse: () => Promise<void>;
}) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [sourceName, setSourceName] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const updateThumbnail = async () => {
        try {
            if (!thumbnailFile) {
                toast.error("Please select a thumbnail image");
                return;
            }

            setIsSaving(true);
            const response = await uploadCourseThumbnailApi(courseId, thumbnailFile);

            if (!response) {
                throw new Error("Couldn't update course thumbnail");
            }

            toast.success("Course thumbnail updated");
            setThumbnailFile(null);
            setSourceName("");
            await reloadCourse();
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login');
            }
            else {
                toast.error(error.response?.data?.message ?? "Couldn't update course thumbnail");
            }
            throw error;
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    size="sm"
                    className="absolute bottom-2 right-2 border bg-white/90 text-black shadow-md hover:bg-white"
                >
                    <CameraIcon className="size-4" />
                    <span className="ml-2">Edit thumbnail</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[720px]">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        updateThumbnail();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Edit course thumbnail</DialogTitle>
                        <DialogDescription>
                            Drag to reposition and zoom before saving.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <CourseThumbnailAdjuster
                            selectedName={sourceName}
                            onAdjustedFile={(file, nextSourceName) => {
                                setThumbnailFile(file);
                                setSourceName(nextSourceName);
                            }}
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="bg-main hover:bg-main-hover" disabled={isSaving}>
                            Save thumbnail
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

type CourseThumbnailAdjusterProps = {
    selectedName?: string;
    onAdjustedFile: (file: File, sourceName: string) => void;
}

function CourseThumbnailAdjuster({
    selectedName,
    onAdjustedFile,
}: CourseThumbnailAdjusterProps) {
    const previewRef = useRef<HTMLDivElement | null>(null);
    const dragStartRef = useRef<{ pointerX: number; pointerY: number; offsetX: number; offsetY: number } | null>(null);
    const [imageSrc, setImageSrc] = useState("");
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [sourceName, setSourceName] = useState("");
    const [sourceResolution, setSourceResolution] = useState("");
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const outputWidth = 1500;
    const outputHeight = 500;
    const inputId = "course-thumbnail-adjuster";

    useEffect(() => {
        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [imageSrc]);

    useEffect(() => {
        if (!image || !sourceName) return;

        createAdjustedFile({ x: 0, y: 0 }, 1);
    }, [image, sourceName]);

    const getPreviewMetrics = (nextZoom = zoom) => {
        if (!previewRef.current || !image) return null;

        const previewWidth = previewRef.current.clientWidth;
        const previewHeight = previewRef.current.clientHeight;
        const coverScale = Math.max(previewWidth / image.naturalWidth, previewHeight / image.naturalHeight) * nextZoom;
        const displayWidth = image.naturalWidth * coverScale;
        const displayHeight = image.naturalHeight * coverScale;

        return {
            previewWidth,
            previewHeight,
            coverScale,
            displayWidth,
            displayHeight,
            maxOffsetX: Math.max(0, (displayWidth - previewWidth) / 2),
            maxOffsetY: Math.max(0, (displayHeight - previewHeight) / 2),
        };
    }

    const clampOffset = (nextOffset: { x: number; y: number }, nextZoom = zoom) => {
        const metrics = getPreviewMetrics(nextZoom);

        if (!metrics) return nextOffset;

        return {
            x: Math.min(metrics.maxOffsetX, Math.max(-metrics.maxOffsetX, nextOffset.x)),
            y: Math.min(metrics.maxOffsetY, Math.max(-metrics.maxOffsetY, nextOffset.y)),
        };
    }

    const createAdjustedFile = async (nextOffset = offset, nextZoom = zoom) => {
        if (!image || !previewRef.current) return;

        const metrics = getPreviewMetrics(nextZoom);
        if (!metrics) return;

        const canvas = document.createElement("canvas");
        canvas.width = outputWidth;
        canvas.height = outputHeight;

        const context = canvas.getContext("2d");
        if (!context) return;

        const imageLeft = metrics.previewWidth / 2 + nextOffset.x - metrics.displayWidth / 2;
        const imageTop = metrics.previewHeight / 2 + nextOffset.y - metrics.displayHeight / 2;
        const sourceX = (0 - imageLeft) / metrics.coverScale;
        const sourceY = (0 - imageTop) / metrics.coverScale;
        const sourceWidth = metrics.previewWidth / metrics.coverScale;
        const sourceHeight = metrics.previewHeight / metrics.coverScale;

        context.drawImage(
            image,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            outputWidth,
            outputHeight,
        );

        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
        if (!blob) return;

        onAdjustedFile(new File([blob], `course-thumbnail-${Date.now()}.jpg`, { type: "image/jpeg" }), sourceName);
    }

    const loadImage = (file?: File) => {
        if (!file) return;

        const nextImageSrc = URL.createObjectURL(file);
        const nextImage = new Image();
        nextImage.onload = () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }

            setImageSrc(nextImageSrc);
            setImage(nextImage);
            setSourceName(file.name);
            setSourceResolution(`${nextImage.naturalWidth} x ${nextImage.naturalHeight}px`);
            setOffset({ x: 0, y: 0 });
            setZoom(1);
        };
        nextImage.src = nextImageSrc;
    }

    const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!image) return;

        event.currentTarget.setPointerCapture(event.pointerId);
        dragStartRef.current = {
            pointerX: event.clientX,
            pointerY: event.clientY,
            offsetX: offset.x,
            offsetY: offset.y,
        };
    }

    const dragImage = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!dragStartRef.current) return;

        const nextOffset = clampOffset({
            x: dragStartRef.current.offsetX + event.clientX - dragStartRef.current.pointerX,
            y: dragStartRef.current.offsetY + event.clientY - dragStartRef.current.pointerY,
        });

        setOffset(nextOffset);
    }

    const stopDrag = async () => {
        if (!dragStartRef.current) return;

        dragStartRef.current = null;
        await createAdjustedFile();
    }

    const updateZoom = async (value: number) => {
        const nextZoom = Number(value);
        const nextOffset = clampOffset(offset, nextZoom);
        setZoom(nextZoom);
        setOffset(nextOffset);
        await createAdjustedFile(nextOffset, nextZoom);
    }

    return (
        <div className="flex flex-col gap-3 rounded-md border p-3">
            <div>
                <Label htmlFor={inputId}>Thumbnail</Label>
                <p className="text-xs text-gray-500">Drag to reposition the image inside the course thumbnail frame.</p>
            </div>

            <Input id={inputId} type="file" accept="image/*" onChange={(event) => loadImage(event.target.files?.[0])} />

            <div
                ref={previewRef}
                className="relative w-full overflow-hidden rounded-md border bg-gray-100"
                style={{ aspectRatio: 3 }}
                onPointerDown={startDrag}
                onPointerMove={dragImage}
                onPointerUp={stopDrag}
                onPointerCancel={stopDrag}
            >
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        className="absolute left-1/2 top-1/2 max-w-none cursor-grab select-none"
                        style={{
                            width: "100%",
                            minHeight: "100%",
                            transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${zoom})`,
                            transformOrigin: "center",
                        }}
                        draggable={false}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-500">
                        Select an image
                    </div>
                )}
            </div>

            <div className="grid gap-1 text-xs text-gray-600">
                <span>Source: {sourceResolution || "No image selected"}</span>
                <span>Saved crop: {outputWidth} x {outputHeight}px</span>
                {selectedName && <span>Ready: {selectedName}</span>}
            </div>

            {imageSrc && (
                <div className="flex items-center gap-3">
                    <Label htmlFor={`${inputId}-zoom`} className="text-xs">Zoom</Label>
                    <Input
                        id={`${inputId}-zoom`}
                        type="range"
                        min={1}
                        max={3}
                        step={0.05}
                        value={zoom}
                        onChange={(event) => updateZoom(Number(event.target.value))}
                    />
                    <span className="w-10 text-xs text-gray-600">{Math.round(zoom * 100)}%</span>
                </div>
            )}
        </div>
    )
}

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

    useEffect(() => {
        setTitle(course?.title ?? "");
        setDescription(course?.description ?? "");
        setPrice(course?.price ?? 0);
        setCurrency(course?.currency ?? "AUD");
    }, [course]);

    const updateCourse = async () => {
        try {
            if (!title.trim()) {
                toast.error("Please add title for the course");
                return;
            }

            const response = await udpateCourseApi(course.id, title, description, price, currency, course.thumbnailId);

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
