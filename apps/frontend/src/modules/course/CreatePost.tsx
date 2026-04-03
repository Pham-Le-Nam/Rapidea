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
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { TextEditor } from "@/components/ui/texteditor";
import Files from './Files';
import { XIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addFileToPostApi, addPostApi, addPostToCourseApi } from "@/api";

type CreatePostProps = {
    className?: string;
    course?: any;
    reloadPosts: () => Promise<void>;
}

function CreatePost({ className, course, reloadPosts }: CreatePostProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState<Record<string, any>>({});
    const [files, setFiles] = useState<any[]>([]);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const addFile = async (file: any) => {
        if (!file) {
            return;
        }

        setFiles(prevFiles => {
            const existingFiles = new Set(prevFiles.map(f => f.id));

            if (existingFiles.has(file.id)) {
                return prevFiles; // Skip adding duplicate file
            }

            return [...prevFiles, file];
        });
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }

    const createPost = async () => {
        try {
                const response = await addPostApi(title, content, course?.id);

                if (!response) {
                    toast.error(`Couldn't create post`);
                    throw Error("Couldn't create post");
                }

                const postId = response.id;

                for (const file of files) {
                    const fileResponse = await addFileToPostApi(file.id, postId);

                    if (!fileResponse) {
                        toast.error(`Couldn't add file ${file.name} to post`);
                        throw Error(`Couldn't add file ${file.name} to post`);
                    }
                }

                const addToCourseResponse = await addPostToCourseApi(postId, course.id);

                if (!addToCourseResponse) {
                    toast.error(`Couldn't include the post in the course`);
                    throw Error(`Couldn't include the post in the course`);
                }

                toast.success("Post created successfully");
                await reloadPosts();
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
            <DialogContent className="sm:max-w-[80%] lg:max-w-[65%] max-h-[90%] overflow-y-auto">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>
                            Create A Post
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Please input post information below. We will ask for more details after this.
                    </DialogDescription>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor={`create-post`} className="mt-2">
                                Title
                            </Label>
                            <Input id={`create-post`} name="create-post" type="text" value={title} onChange={(n) => setTitle(n.target.value)}/>
                        </Field>
                        <Field>
                            <Label htmlFor={`create-post`} className="mt-2">
                                Content
                            </Label>
                            <TextEditor value={content} onChange={setContent} />
                        </Field>
                        <Field>
                            <Label htmlFor={`create-post`} className="mt-2">
                                Files
                            </Label>
                            {files.map((file, index) => (
                                <div className="w-full border flex flex-row items-center px-2 py-1 rounded-md" key={index}>
                                    {file.name}
                                    <Button asChild className="ml-auto bg-white hover:bg-gray-100 h-6 w-6" onClick={() => removeFile(index)}>
                                        <span>
                                            <XIcon className="text-black"/>
                                        </span>
                                    </Button>
                                </div>
                            ))}
                            <Files course={course} addFile={addFile}/>
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="pt-3">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" className="bg-main hover:bg-main-hover" onClick={createPost}>
                                Save changes
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePost;