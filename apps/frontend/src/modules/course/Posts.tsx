import { Button } from "@/components/ui/button";
import CreatePost from "./CreatePost";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { getCourseApi, getFilesOfPostApi, getPostApi, getPostsOfCourseApi, getProfileApi, getProfileByIdApi } from "@/api";
import { TextRenderer } from "@/components/ui/texteditor";

function Posts({
    course
} : {
    course: any;
}) {
    const [posts, setPosts] = useState<any[]>([]);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isOwner, setIsOwner] = useState(false);

    const loadPosts = async () => {
        try {
            const postsResponse = await getPostsOfCourseApi(course.id);
            setIsOwner(postsResponse.isOwner);
            setPosts(postsResponse.posts);
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
        if (!course?.id) return;
        loadPosts();
    }, [course?.id]);

    return (
        <div className="flex flex-col justify-center items-center w-full gap-3">
            {isOwner &&
                <CreatePost className="w-full h-full text-3xl" course={course} reloadPosts={loadPosts}/>
            }

            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
            
        </div>
    );
}

type PostProps = {
    post: any;
}

function Post ({ post }: PostProps) {
    const [courseImg, setCourseImg] = useState(`${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`);
    const [ownerAvatar, setOwnerAvatar] = useState(`${import.meta.env.VITE_PHOTO_STORAGE}default_avatar.png`);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [course, setCourse] = useState<any>();
    const [isOwner, setIsOwner] = useState(false);
    const [owner, setOwner] = useState<any>();
    const [files, setFiles] = useState<any[]>([]);

    const loadPostDetails = async () => {
        try {
            const courseResponse = await getCourseApi(post.courseId);
            const ownerResponse = await getProfileByIdApi(post.userId);
            const fileResponse = await getFilesOfPostApi(post.id);

            setCourse(courseResponse.course);
            setIsOwner(courseResponse.isOwner);
            setOwner(ownerResponse.profile);
            setCourseImg(courseResponse.course.imageUrl || `${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`);
            setOwnerAvatar(ownerResponse.profile.avatarUrl || `${import.meta.env.VITE_PHOTO_STORAGE}default_avatar.png`);
            setFiles(fileResponse);
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
        if (!post?.id) return;
        loadPostDetails();
    }, [post?.id]);

    return (
        <div className="flex flex-col justify-center items-start w-full rounded-md border shadow-md p-3">
            <div className="flex flex-row w-full">
                <div className="flex flex-col">
                    <img src={courseImg} className=" border-2 w-20 aspect-2/1 object-cover rounded-md" onClick={() => navigate(`/course/${course?.id}`)}/>
                    <img src={ownerAvatar} className="rounded-full border-2 w-13 aspect-square -translate-y-1/2 translate-x-3" onClick={() => navigate(`/profile/${owner?.username}`)}/>
                </div>
                <div className="flex flex-col px-2">
                    <a className="font-bold text-lg hover:underline" href={`/course/${course?.id}`}>
                        {course?.title}
                    </a>
                    <a className="text-gray-500 hover:underline" href={`/profile/${owner?.username}`}>
                        {owner?.firstname} {owner?.middlename} {owner?.lastname}
                    </a>
                </div>
            </div>

            <h2 className="px-3 font-bold text-2xl whitespace-break-spaces">
                {post.title}
            </h2>
            
            <TextRenderer content={post.content} className="px-3 py-2"/>

            {files?.map((file, index) => (
                <Button 
                className="w-full h-full min-w-0 flex items-center justify-start gap-2 rounded-xl border-2 bg-white hover:bg-gray-100 text-black text-lg font-normal [&>svg]:w-5 [&>svg]:h-5"
                >
                    <span className="min-w-0 wrap-break-word whitespace-normal">
                        {file.name}
                    </span>
                </Button>
            ))}
        </div>
    )
}

export { 
    Posts,
    Post,
};