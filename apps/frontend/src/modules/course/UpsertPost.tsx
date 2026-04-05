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
import { addFileToPostApi, addPostApi, addPostToCourseApi, removeFileToPostApi, updatePostApi } from "@/api";

type UpsertPostProps = {
    className?: string;
    course: any;
    post?: any;
    uploadedFiles?: any[];
    reloadPost: () => Promise<void>;
}

function UpsertPost({ className, post, uploadedFiles, course, reloadPost }: UpsertPostProps) {
    const [title, setTitle] = useState(post?.title || "");
    const [content, setContent] = useState<Record<string, any>>(post?.content || {});
    const [deleteFiles, setDeleteFiles] = useState<any[]>([]);
    const [files, setFiles] = useState<any[]>([]);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const addFile = async (file: any) => {
        if (!file) {
            return;
        }

        setFiles(prevFiles => {
            const existingFiles = new Set(prevFiles.map(f => f.id));

            if (existingFiles.has(file.id) || uploadedFiles?.find((f) => f.id === file.id)) {
                // If the file is added to deleting files, don't delete it anymore.
                setDeleteFiles(prev => prev.filter(f => f.id !== file.id));

                return prevFiles; // Skip adding duplicate file
            }

            return [...prevFiles, file];
        });
    }

    const addDeleteFile = (file: any) => {
        if (!file) {
            return;
        }
        
        setDeleteFiles(prev => [...prev, file]);
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }

    const resetValues = async () => {
        setTitle(post?.title || "");
        setContent(post?.content || {});
        setDeleteFiles([]);
        setFiles([]);
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

            const addToCourseResponse = await addPostToCourseApi(postId, course?.id);

            if (!addToCourseResponse) {
                toast.error(`Couldn't include the post in the course`);
                throw Error(`Couldn't include the post in the course`);
            }

            toast.success("Post created successfully");
            await reloadPost();
            await resetValues();
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

    const updatePost = async () => {
        try {
            const postId = post?.id;

            if (!postId) {
                toast.error("Post not found");
                throw Error("Post not found");
            }

            const response = await updatePostApi(title, content, postId);

            if (!response) {
                toast.error(`Couldn't update post`);
                throw Error("Couldn't update post");
            }

            for (const file of files) {
                const fileResponse = await addFileToPostApi(file.id, postId);

                if (!fileResponse) {
                    toast.error(`Couldn't add file ${file.name} to post`);
                    throw Error(`Couldn't add file ${file.name} to post`);
                }
            }

            for (const file of deleteFiles) {
                const fileResponse = await removeFileToPostApi(file.id, postId);

                if (!fileResponse) {
                    toast.error(`Couldn't remove file ${file.name}`);
                    throw Error(`Couldn't remove file ${file.name}`);
                }
            }

            toast.success("Post uploaded successfully");
            await reloadPost();
            await resetValues();
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
                    {post ? "Update" : "+"}
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
                            {post ? "Update" : "Create"} A Post
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
                            {uploadedFiles
                                ?.filter(file => !deleteFiles.find(f => f === file))
                                .map((file, index) => (
                                    <div className="w-full border flex flex-row items-center px-2 py-1 rounded-md" key={index}>
                                        <span className="wrap-anywhere whitespace-break-spaces">
                                            {file.name}
                                        </span>
                                        <Button asChild className="ml-auto bg-white hover:bg-gray-100 h-6 w-6" onClick={() => addDeleteFile(file)}>
                                            <span>
                                                <XIcon className="text-black"/>
                                            </span>
                                        </Button>
                                    </div>
                                ))
                            }
                            {files.map((file, index) => (
                                <div className="w-full border flex flex-row items-center px-2 py-1 rounded-md" key={index}>
                                    <span className="wrap-anywhere whitespace-break-spaces">
                                        {file.name}
                                    </span>
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
                            <Button variant="outline" onClick={resetValues}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" className="bg-main hover:bg-main-hover" onClick={post? updatePost : createPost}>
                                Save changes
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpsertPost;