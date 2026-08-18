import { getCourseReviewsApi, reviewCourseApi } from "@/api";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import { buildMediaUrl, DEFAULT_AVATAR_URL } from "@/lib/media";

type ReviewsProps = {
    course: any;
    isLoggedIn: boolean;
    isSubscribed: boolean;
    isOwner: boolean;
    subscription: any;
    reloadCourse: () => Promise<void>;
}

export function Reviews({
    course,
    isLoggedIn,
    isSubscribed,
    isOwner,
    subscription,
    reloadCourse,
}: ReviewsProps) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState<any[]>([]);
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loadReviews = async () => {
        try {
            if (!course?.id) return;

            setIsLoading(true);
            const response = await getCourseReviewsApi(course.id);
            setReviews(response ?? []);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadReviews();
    }, [course?.id]);

    useEffect(() => {
        setRating(subscription?.rating || 5);
        setReview(subscription?.review ?? "");
    }, [subscription]);

    const submitReview = async () => {
        try {
            if (!isLoggedIn) {
                toast.error("Please log in to review this course");
                navigate("/login");
                return;
            }

            if (!isSubscribed) {
                toast.error("Subscribe to this course before reviewing it");
                return;
            }

            if (!review.trim()) {
                toast.error("Please write a review");
                return;
            }

            setIsSubmitting(true);
            await reviewCourseApi(course.id, review.trim(), rating);
            toast.success("Review saved");
            await reloadCourse();
            await loadReviews();
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            }
            else {
                toast.error(error.response?.data?.message ?? "Couldn't save review");
            }
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    }

    const getProfileName = (profile: any) => (
        [profile?.firstname, profile?.middlename, profile?.lastname].filter(Boolean).join(" ") || profile?.username || "Subscriber"
    );

    const getAvatarUrl = (profile: any) => {
        const avatarName = profile?.avatar?.name;

        return buildMediaUrl(avatarName) || DEFAULT_AVATAR_URL;
    }

    const getProfilePath = (profile: any) => (
        profile?.username ? `/profile/${profile.username}` : ""
    );

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "";
        }

        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    return (
        <div className="flex w-full flex-col gap-3 rounded-md border p-4 shadow-sm">
            {isSubscribed && (
                <div className="flex flex-col gap-3 rounded-md border p-3">
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="course-review-rating">Rating</Label>
                            <div id="course-review-rating" className="flex items-center gap-2">
                                <StarRating value={rating} onChange={setRating} size={28} />
                                <span className="text-sm font-medium text-gray-600">
                                    {rating.toFixed(1)}
                                </span>
                            </div>
                        </Field>

                        <Field>
                            <Label htmlFor="course-review">Review</Label>
                            <Textarea
                                id="course-review"
                                value={review}
                                onChange={(event) => setReview(event.target.value)}
                                placeholder="Share your experience with this course"
                                className="min-h-28"
                            />
                        </Field>
                    </FieldGroup>

                    <div className="flex justify-end">
                        <Button
                            className="bg-main hover:bg-main-hover"
                            disabled={isSubmitting}
                            onClick={submitReview}
                        >
                            {subscription?.review ? "Update Review" : "Submit Review"}
                        </Button>
                    </div>
                </div>
            )}

            {!isSubscribed && isLoggedIn && !isOwner && (
                <div className="rounded-md border p-3 text-sm text-gray-600">
                    Subscribe to this course to leave a rating and review.
                </div>
            )}

            {isOwner && (
                <div className="rounded-md border p-3 text-sm text-gray-600">
                    Course owners cannot review their own course.
                </div>
            )}

            <div className="flex flex-col gap-3">
                {isLoading ? (
                    <LoadingScreen label="Loading reviews..." />
                ) : reviews.length === 0 ? (
                    <div className="text-center text-sm text-gray-500">
                        No reviews yet.
                    </div>
                ) : reviews.map((courseReview) => {
                    const profilePath = getProfilePath(courseReview.subscriber);
                    const profileName = getProfileName(courseReview.subscriber);

                    return (
                        <div key={courseReview.id} className="flex gap-3 rounded-md border p-3">
                            {profilePath ? (
                                <Link
                                    to={profilePath}
                                    aria-label={`View ${profileName}'s profile`}
                                    className="h-10 flex-shrink-0 rounded-full"
                                >
                                    <img
                                        src={getAvatarUrl(courseReview.subscriber)}
                                        alt={profileName}
                                        className="size-10 rounded-full border object-cover"
                                    />
                                </Link>
                            ) : (
                                <img
                                    src={getAvatarUrl(courseReview.subscriber)}
                                    alt={profileName}
                                    className="size-10 rounded-full border object-cover"
                                />
                            )}
                            <div className="flex flex-1 flex-col gap-1">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                    {profilePath ? (
                                        <Link to={profilePath} className="font-semibold hover:underline">
                                            {profileName}
                                        </Link>
                                    ) : (
                                        <span className="font-semibold">
                                            {profileName}
                                        </span>
                                    )}
                                    <StarRating value={courseReview.rating} size={18} disabled />
                                    <span className="text-sm text-gray-500">{Number(courseReview.rating).toFixed(1)}</span>
                                    <span className="text-xs text-gray-500">
                                        {formatDate(courseReview.createdAt)}
                                    </span>
                                </div>
                                <p className="whitespace-pre-wrap text-sm">
                                    {courseReview.review}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
