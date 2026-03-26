import { getCourseApi } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@base-ui/react";
import { FileIcon, BarChartHorizontalIcon } from "lucide-react";
import Files from './Files';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function Course () {
    const { id } = useParams();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const [rating, setRating] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    const [description, setDescription] = useState("");
    // There are 2 view modes for now post/file
    const [viewMode, setViewMode] = useState("post");
    const [course, setCourse] = useState<any>();
    
    const loadCourse = async () => {
        try {
            if (!id) {
                throw Error('id not found');
            }

            const response = await getCourseApi(id);
            const course = response.course;
            setIsOwner(response.isOwner);
            setTitle(course.title);
            setRating(course.rating);
            setRatingCount(course.ratingCount);
            setDescription(course.description);
            setCourse(course);

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
    }, [id])

    return (
        <div className="flex flex-col items-center justify-start px-2 gap-3 w-full max-w-350">
            <div className="flex flex-col items-center justify-start rounded-md border shadow-md w-full gap-3">
                <img src={`${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`} className="w-full aspect-3/1 object-cover rounded-md" />
                
                <div className="flex flex-row items-center justify-start md:gap-3">
                    <h1 className="font-bold text-xl whitespace-break-spaces">
                        {`${title} `}
                    </h1>

                    <h2 className="text-lg">
                        {`${4.5}⭐ ${shortenRatingCount(1230)} Ratings`}
                    </h2>
                </div>

                <p className="px-4 pb-2">
                    {description}
                </p>

                <div className="flex flex-row w-full">
                    <Button
                        onClick={() => setViewMode('post')}
                        disabled={viewMode === 'post'}
                        className={`flex flex-col items-center px-4 py-2 rounded border-t w-full
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
                        className={`flex flex-col items-center px-4 py-2 rounded border-t w-full
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
        </div>
    )
}

export default Course;