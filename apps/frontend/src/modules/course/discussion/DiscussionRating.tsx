import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import StarRating from "@/components/StarRating";
import { useAuth } from "@/context/AuthContext";
import { addRateDiscussionApi, getRateDiscussionApi, updateRateDiscussionApi } from "@/api";

type DiscussionRatingProps = {
    discussionId: string;
    averageRating?: number;
    ratingCount?: number;
    onRated?: () => Promise<void> | void;
}

export function DiscussionRating ({
    discussionId,
    averageRating = 0,
    ratingCount = 0,
    onRated,
}: DiscussionRatingProps) {
    const [rating, setRating] = useState(0);
    const [isRated, setIsRated] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const loadUserRating = async () => {
        if (!isLoggedIn || !discussionId) {
            setRating(0);
            setIsRated(false);
            return;
        }

        try {
            const response = await getRateDiscussionApi(discussionId);

            if (response?.isRated) {
                setRating(response.rateDiscussion.rating);
                setIsRated(true);
            } else {
                setRating(0);
                setIsRated(false);
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            }
        }
    }

    const rateDiscussion = async (value: number) => {
        if (!isLoggedIn) {
            toast.error("Please log in to rate this discussion");
            navigate("/login");
            return;
        }

        setIsSaving(true);

        try {
            if (isRated) {
                await updateRateDiscussionApi(discussionId, value);
            } else {
                await addRateDiscussionApi(discussionId, value);
                setIsRated(true);
            }

            setRating(value);
            await onRated?.();
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            } else {
                toast.error("Couldn't rate this discussion");
            }
        } finally {
            setIsSaving(false);
        }
    }

    useEffect(() => {
        loadUserRating();
    }, [discussionId, isLoggedIn]);

    return (
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
            {ratingCount > 0 && (
                <span>
                    {formatRating(averageRating)} ⭐ ({ratingCount} rating{ratingCount === 1 ? "" : "s"})
                </span>
            )}

            {isLoggedIn && (
                <div className="flex items-center gap-1">
                    <span>Your rating</span>
                    <StarRating
                        value={rating}
                        size={18}
                        disabled={isSaving}
                        onChange={rateDiscussion}
                        className="flex items-center"
                    />
                </div>
            )}
        </div>
    )
}

function formatRating(value: number) {
    return Number.isFinite(value) ? value.toFixed(1) : "0.0";
}
