import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Field, FieldGroup } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { TextEditor } from "@/shared/components/ui/texteditor";
import { FileViewer, Files } from "@/features/files";
import { SparklesIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/providers";
import { useNavigate } from "react-router-dom";
import { addFileToPostApi, addPostApi, generatePostFieldApi, removeFileToPostApi, updatePostApi } from "@/features/posts/api";
import { TagSelector, extractTextFromEditorContent, getExplicitTagNames, getTagNames } from "@/features/tags";
import LoadingScreen from "@/shared/components/LoadingScreen";
import { SelectedPostFile } from "./SelectedPostFile";

type UpsertPostProps = {
    className?: string;
    course?: any;
    courseOptions?: any[];
    fileFolder?: any;
    post?: any;
    uploadedFiles?: any[];
    reloadPost: () => Promise<void>;
}

function UpsertPost({ className, post, uploadedFiles, course, courseOptions = [], fileFolder, reloadPost }: UpsertPostProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(post?.title || "");
    const [content, setContent] = useState<Record<string, any>>(post?.content || {});
    const [isPreview, setIsPreview] = useState(!!post?.isPreview);
    const [selectedCourseId, setSelectedCourseId] = useState(post?.courseId ?? course?.id ?? "general");
    const [deleteFiles, setDeleteFiles] = useState<any[]>([]);
    const [files, setFiles] = useState<any[]>([]);
    const [viewFile, setViewFile] = useState<any | null>(null);
    const [tags, setTags] = useState<string[]>(getExplicitTagNames(post));
    const [generating, setGenerating] = useState<"title" | "details" | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { logout } = useAuth();
    const navigate = useNavigate();
    const availableCourses = [
        ...courseOptions,
        ...(course?.id ? [course] : []),
    ].filter((option, index, options) => (
        option?.id && options.findIndex((courseOption) => courseOption?.id === option.id) === index
    ));
    const selectedCourse = availableCourses.find((courseOption) => courseOption.id === selectedCourseId);
    const selectedPostCourseId = selectedCourseId === "general" ? undefined : selectedCourseId;
    const rootFolderId = selectedCourse?.folderId ?? fileFolder?.id;
    const activeFiles = [
        ...(uploadedFiles?.filter((file) => !deleteFiles.some((deleted) => deleted.id === file.id)) ?? []),
        ...files,
    ];

    const generateField = async (target: "title" | "details") => {
        try {
            setGenerating(target);
            const response = await generatePostFieldApi({
                target,
                title,
                details: extractTextFromEditorContent(content),
                tags,
                fileIds: activeFiles.map((file) => file.id),
            });
            if (target === "title") setTitle(response.value);
            else setContent(response.value);
            toast.success(`${target === "title" ? "Title" : "Details"} generated`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Couldn't generate post content");
        } finally {
            setGenerating(null);
        }
    };

    const changePostLocation = (value: string) => {
        setSelectedCourseId(value);
        setViewFile(null);

        if (value === "general") {
            setIsPreview(false);
        }
    }

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

    const toggleViewFile = (file: any) => {
        setViewFile((currentFile: any | null) => (
            currentFile?.id === file.id ? null : file
        ));
    }

    const resetValues = async () => {
        setTitle(post?.title || "");
        setContent(post?.content || {});
        setIsPreview(!!post?.isPreview);
        setSelectedCourseId(post?.courseId ?? course?.id ?? "general");
        setDeleteFiles([]);
        setFiles([]);
        setViewFile(null);
        setTags(getExplicitTagNames(post));
    }

    const createPost = async () => {
        setIsSubmitting(true);

        try {
            const response = await addPostApi(
                title,
                content,
                selectedPostCourseId,
                isPreview,
                tags,
            );

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

            toast.success("Post created successfully");
            await reloadPost();
            await resetValues();
            setOpen(false);
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login');
                return;
            }

            toast.error(error.response?.data?.message ?? error.message ?? "Couldn't create post");
        } finally {
            setIsSubmitting(false);
        }
    }

    const updatePost = async () => {
        setIsSubmitting(true);

        try {
            const postId = post?.id;

            if (!postId) {
                toast.error("Post not found");
                throw Error("Post not found");
            }

            const response = await updatePostApi(
                title,
                content,
                postId,
                isPreview,
                selectedPostCourseId ?? null,
                tags,
            );

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
            setOpen(false);
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login');
                return;
            }

            toast.error(error.response?.data?.message ?? error.message ?? "Couldn't update post");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (isSubmitting) return;
                setOpen(nextOpen);
                if (!nextOpen) void resetValues();
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline" className={className}>
                    {post ? "Update" : "+"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[80%] lg:max-w-[65%] max-h-[90%] overflow-y-auto">
                {isSubmitting ? (
                    <LoadingScreen label={post ? "Updating post..." : "Creating post..."} />
                ) : (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        void (post ? updatePost() : createPost());
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
                            <div className="flex items-center justify-between gap-2">
                                <Label htmlFor={`create-post`} className="mt-2">Title</Label>
                                <Button type="button" variant="outline" size="sm" className="gap-2" disabled={!!generating} onClick={() => generateField("title")}>
                                    <SparklesIcon className="size-4" />
                                    {generating === "title" ? "Generating..." : "Generate title"}
                                </Button>
                            </div>
                            <Input id={`create-post`} name="create-post" type="text" value={title} onChange={(n) => setTitle(n.target.value)}/>
                        </Field>
                        <Field>
                            <Label htmlFor="post-location" className="mt-2">
                                Post location
                            </Label>
                            <select
                                id="post-location"
                                value={selectedCourseId}
                                className="h-9 rounded-md border bg-transparent px-3 text-sm"
                                onChange={(event) => changePostLocation(event.target.value)}
                            >
                                <option value="general">General (not in any course)</option>
                                {availableCourses.map((courseOption) => (
                                    <option key={courseOption.id} value={courseOption.id}>
                                        {courseOption.title}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <Field>
                            <div className="flex items-center justify-between gap-2">
                                <Label htmlFor={`create-post`} className="mt-2">Details</Label>
                                <Button type="button" variant="outline" size="sm" className="gap-2" disabled={!!generating} onClick={() => generateField("details")}>
                                    <SparklesIcon className="size-4" />
                                    {generating === "details" ? "Generating..." : "Generate details"}
                                </Button>
                            </div>
                            <TextEditor value={content} onChange={setContent} />
                        </Field>
                        <Field>
                            <TagSelector
                                value={tags}
                                onChange={setTags}
                                suggestionText={[
                                    title,
                                    extractTextFromEditorContent(content),
                                    ...activeFiles.map((file) => `${file.name} ${getTagNames(file).join(" ")}`),
                                ].join("\n")}
                            />
                        </Field>
                        {selectedPostCourseId && (
                            <Field>
                                <label className="flex items-center gap-2 text-sm font-medium">
                                    <Input
                                        type="checkbox"
                                        className="size-4"
                                        checked={isPreview}
                                        onChange={(event) => setIsPreview(event.target.checked)}
                                    />
                                    Preview post
                                </label>
                            </Field>
                        )}
                        {rootFolderId && (
                            <Field>
                                <Label htmlFor={`create-post`} className="mt-2">
                                    Files
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    click to inspect the selected file(s)
                                </p>
                                {uploadedFiles
                                    ?.filter(file => !deleteFiles.some((deletedFile) => deletedFile.id === file.id))
                                    .map((file, index) => (
                                        <SelectedPostFile
                                            key={file.id ?? index}
                                            file={file}
                                            isSelected={viewFile?.id === file.id}
                                            onSelect={() => toggleViewFile(file)}
                                            onRemove={() => {
                                                if (viewFile?.id === file.id) {
                                                    setViewFile(null);
                                                }
                                                addDeleteFile(file);
                                            }}
                                        />
                                    ))
                                }
                                {files.map((file, index) => (
                                    <SelectedPostFile
                                        key={file.id ?? index}
                                        file={file}
                                        isSelected={viewFile?.id === file.id}
                                        onSelect={() => toggleViewFile(file)}
                                        onRemove={() => {
                                            if (viewFile?.id === file.id) {
                                                setViewFile(null);
                                            }
                                            removeFile(index);
                                        }}
                                    />
                                ))}
                                {viewFile && <FileViewer file={viewFile} />}
                                <Files rootFolderId={rootFolderId} addFile={addFile}/>
                            </Field>
                        )}
                    </FieldGroup>
                    <DialogFooter className="pt-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                void resetValues();
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-main hover:bg-main-hover">
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default UpsertPost;
