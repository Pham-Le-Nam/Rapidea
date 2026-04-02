import { Button } from "@/components/ui/button";
import CreatePost from "./CreatePost";

function Posts() {
    return (
        <div className="flex flex-col justify-center items-center w-full gap-3">
            <CreatePost className="w-full h-full text-3xl" />

            <div className="flex flex-col justify-center items-center w-full rounded-md border shadow-md">
                <h1>
                    Posts
                </h1>
            </div>
            
        </div>
    );
}

export default Posts;


