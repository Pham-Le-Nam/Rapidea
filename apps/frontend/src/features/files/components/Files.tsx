import { Button } from "@/shared/components/ui/button";
import { 
    ChevronLeftIcon, 
    ChevronRightIcon,
    PlusIcon,
    FolderIcon,
    FileIcon,
    XIcon,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { useAuth } from "@/providers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    createFolderApi,
    deleteFileApi,
    deleteFolderApi,
    getFileApi,
    getFolderApi,
    getFolderPostUsagesApi,
    getPostsUsingFileApi,
    renameFolderApi,
    updateFileApi,
    uploadFileApi,
} from "@/features/files/api";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
    Dialog,
    DialogClose,
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
import LoadingScreen from "@/shared/components/LoadingScreen";
import { buildApiUrl } from "@/shared/lib/media";

type FilesProp = {
    rootFolderId: string,
    addFile?: (file: any) => Promise<void>,
    lockRootActions?: boolean,
}

type FolderCrumb = {
    id: string;
    name: string;
}

function Files ({ rootFolderId, addFile, lockRootActions = false }: FilesProp) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [folder, setFolder] = useState<any>();
    const [isOwner, setIsOwner] = useState(false);
    const [childrenFolders, setChildrenFolder] = useState([]);
    const [childrenFiles, setChildrenFiles] = useState([]);
    const [isRootFolder, setIsRootFolder] = useState(true);
    const [newFolderName, setNewFolderName] = useState("");
    const [newFileName, setNewFileName] = useState("");
    const [breadcrumbs, setBreadcrumbs] = useState<FolderCrumb[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const isRootActionLocked = lockRootActions && isRootFolder;

    const loadFolder = async (
        folderId: string,
        nextBreadcrumbs?: FolderCrumb[],
        showLoading = true,
    ) => {
        try {
            if (showLoading) {
                setIsLoading(true);
            }
            const response = await getFolderApi(folderId);

            if (!response) {
                throw Error("No response found");
            }

            const folders = response.childrenFolders;
            folders.sort((a: any, b: any) => a.name.localeCompare(b.name));
            const files = response.childrenFiles;
            files.sort((a: any, b: any) => a.name.localeCompare(b.name));

            setFolder(response.folder);
            setIsOwner(response.isOwner);
            setChildrenFolder(folders);
            setChildrenFiles(files);
            setIsRootFolder(folderId === rootFolderId);
            setBreadcrumbs((currentBreadcrumbs) => {
                const loadedCrumb = {
                    id: response.folder.id,
                    name: response.folder.name,
                };

                if (nextBreadcrumbs) {
                    return nextBreadcrumbs.map((crumb) => (
                        crumb.id === loadedCrumb.id ? loadedCrumb : crumb
                    ));
                }

                if (folderId === rootFolderId) {
                    return [loadedCrumb];
                }

                const existingIndex = currentBreadcrumbs.findIndex((crumb) => crumb.id === loadedCrumb.id);

                if (existingIndex >= 0) {
                    return [
                        ...currentBreadcrumbs.slice(0, existingIndex),
                        loadedCrumb,
                    ];
                }

                return [...currentBreadcrumbs, loadedCrumb];
            });
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
            if (showLoading) {
                setIsLoading(false);
            }
        }
    }

    const refreshFolder = async (folderId: string) => {
        await loadFolder(folderId, undefined, false);
    }

    const createFolder = async () => {
        try {
            if (newFolderName === "") {
                toast.error("Please input folder name");
                throw Error("Folder name not found");
            }

            const response = await createFolderApi(newFolderName, folder.id);

            if (!response) {
                toast.error("Something wrong happened! Couldn't create folder.");
            }

            if (folder) {
                await refreshFolder(folder.id);
                setNewFolderName("");
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

    const renameFolder = async (folderId: string, name: string) => {
        try {
            if (name === "") {
                toast.error("Please input folder name");
                throw Error("Folder name not found");
            }

            const response = await renameFolderApi(folderId, name);

            if (!response) {
                toast.error("Something wrong happened! Couldn't rename folder.");
            }

            if (folder) {
                loadFolder(folder.id);
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

    const openFile = async (fileId: string) => {
        try {
            const response = await getFileApi(fileId);

            if (!response) {
                toast.error("Something wrong happened! Couldn't retrieve file URL.");
            }

            window.open(buildApiUrl(response), '_blank', 'noopener,noreferrer');
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

    const downloadFile = (file: any) => {
        const link = document.createElement('a');
        link.href = buildApiUrl(`api/file/download/${encodeURIComponent(file.id)}`);
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    const renameFile = async (fileId: string, name: string) => {
        try {
            if (name === "") {
                toast.error("Please input file name");
                throw Error("File name not found");
            }
            const response = await updateFileApi(fileId, name);

            if (!response) {
                toast.error("Something wrong happened! Couldn't rename file.");
            }

            if (folder) {
                loadFolder(folder.id);
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

    const deleteFolder = async (folderId: string) => {
        try {
            const response = await deleteFolderApi(folderId);
            console.log(response);

            if (!response) {
                toast.error("Something wrong happened! Couldn't delete folder.");
            }

            loadFolder(folder?.id);
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

    const deleteFile = async (fileId: string) => {
        try {
            const response = await deleteFileApi(fileId);
            console.log(response);

            if (!response) {
                toast.error("Something wrong happened! Couldn't delete file.");
            }

            loadFolder(folder?.id);
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
        if (rootFolderId) {
            setBreadcrumbs([]);
            loadFolder(rootFolderId);
        }
    }, [rootFolderId]);

    return (
        <div className="flex flex-col items-center justify-start rounded-md border shadow-md w-full gap-3">
            
            <div className="relative w-full flex items-center border-b-2 h-8">
                {!isRootFolder && (
                    <Button
                        asChild
                        className="absolute left-0 hover:bg-gray-100 border-r-2 h-full bg-white"
                        onClick={() => loadFolder(folder.parentId, breadcrumbs.slice(0, -1))}
                    >
                        <span>
                            <ChevronLeftIcon className="text-black" />
                        </span>
                    </Button>
                ) }

                <nav
                    aria-label="Folder breadcrumb"
                    className="mx-auto flex max-w-[calc(100%-5rem)] items-center overflow-x-auto px-10 text-sm font-medium"
                >
                    {folder ? breadcrumbs.map((crumb, index) => {
                        const isCurrentCrumb = index === breadcrumbs.length - 1;

                        return (
                            <div key={crumb.id} className="flex shrink-0 items-center">
                                {index > 0 && <ChevronRightIcon className="mx-1 size-4 text-gray-400" />}
                                <button
                                    type="button"
                                    className={`max-w-40 truncate rounded-sm px-1 py-0.5 ${
                                        isCurrentCrumb
                                            ? "cursor-default text-gray-900"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                    disabled={isCurrentCrumb}
                                    onClick={() => loadFolder(crumb.id, breadcrumbs.slice(0, index + 1))}
                                    title={crumb.name}
                                >
                                    {crumb.name}
                                </button>
                            </div>
                        );
                    }) : "Loading..."}
                </nav>

                {isOwner && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="absolute right-0 hover:bg-gray-100 h-full bg-white">
                            <Button variant="outline" className="border-0 border-l-2">
                                <PlusIcon />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <DocumentName submit={createFolder} value={newFolderName} setValue={setNewFolderName} title="Create Folder" className="hover:bg-gray-100 w-full text-lg"/>
                            </DropdownMenuItem>

                            {!isRootActionLocked && (
                                <DropdownMenuItem asChild>
                                    <FileUpload className="hover:bg-gray-100 w-full text-lg" folderId={folder?.id} refreshFolder={refreshFolder}/>
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
            
            <div className="flex flex-col justify-center items-center px-2 mb-2 w-full">
                {isLoading ? (
                    <LoadingScreen label="Loading files..." />
                ) : (
                    <>
                {childrenFolders.map((childFolder: any) => (
                    <div className="flex min-w-0 flex-row justify-start items-center w-full" key={childFolder.name}>
                        <Button 
                            className="flex-1 min-w-0 flex items-center justify-start gap-2 rounded-full bg-white hover:bg-gray-100 text-black text-lg p-2 font-normal [&>svg]:w-5 [&>svg]:h-5"
                            onClick={() => loadFolder(childFolder.id, [...breadcrumbs, { id: childFolder.id, name: childFolder.name }])}
                            title={childFolder.name}
                        >
                            <FolderIcon className="shrink-0" />
                            <span className="min-w-0 truncate">
                                {childFolder.name}
                            </span>
                        </Button>

                        {isOwner && !isRootActionLocked && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="hover:bg-gray-100 h-full bg-white shrink-0">
                                    <Button variant="outline" className="border-0 rounded-full">
                                        <PlusIcon />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <DocumentName submit={() => renameFolder(childFolder.id, newFolderName)} value={newFolderName} setValue={setNewFolderName} title="Rename" className="hover:bg-gray-100 w-full text-lg"/>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <DeleteDocument
                                            title="Folder"
                                            submit={deleteFolder}
                                            document={childFolder}
                                            className="hover:bg-gray-100 w-full text-lg"
                                            destructive
                                            getRelatedFiles={getFolderPostUsagesApi}
                                        />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                ))}

                {childrenFiles.map((childFile: any) => (
                    <div className="flex min-w-0 flex-row justify-start items-center w-full" key={childFile.name}>
                        <Button 
                            className="flex-1 min-w-0 flex items-center justify-start gap-2 rounded-full bg-white hover:bg-gray-100 text-black text-lg p-2 font-normal [&>svg]:w-5 [&>svg]:h-5"
                            onClick={() => addFile ? addFile(childFile) : openFile(childFile.id)}
                            onDoubleClick={() => openFile(childFile.id)}
                            title={childFile.name}
                        >
                            <FileIcon className="shrink-0" />
                            <span className="min-w-0 truncate">
                                {childFile.name}
                            </span>
                        </Button>

                        {isOwner && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="hover:bg-gray-100 h-full bg-white shrink-0">
                                    <Button variant="outline" className="border-0 rounded-full">
                                        <PlusIcon />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        asChild
                                        onClick={() => downloadFile(childFile)}
                                    >
                                        <span className="flex w-full items-center gap-2 text-lg hover:bg-gray-100">
                                            Download
                                        </span>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <DocumentName submit={() => renameFile(childFile.id, newFileName)} value={newFileName} setValue={setNewFileName} title="Rename File" className="hover:bg-gray-100 w-full text-lg"/>
                                    </DropdownMenuItem>

                                    {!isRootActionLocked && (
                                        <DropdownMenuItem asChild>
                                            <DeleteDocument
                                                title="File"
                                                submit={deleteFile}
                                                document={childFile}
                                                className="hover:bg-gray-100 w-full text-lg text-red-600"
                                                destructive
                                                getRelatedPosts={getPostsUsingFileApi}
                                            />
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}                        
                    </div>
                ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default Files;



// Handle both create and rename folder with the same component to avoid code duplication
type DocumentNameProps = {
    submit: () => Promise<void>;
    value?: string;
    setValue: Dispatch<SetStateAction<string>>;
    title: string;
    className?: string;
}

function DocumentName ({ submit, value, setValue, title, className }: DocumentNameProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className={className}>
                    {title}
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[50%]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Please input name
                    </DialogDescription>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor={`${title}`} className="mt-2">
                                Name
                            </Label>
                            <Input id={`${title}`} name={title} value={value ?? ""} onChange={(n) => setValue(n.target.value)}/>
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="pt-3">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" className="bg-main hover:bg-main-hover">
                                Save changes
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                    </form>
            </DialogContent>
        </Dialog>
    );
}


type FileUploadProps = {
    className?: string;
    folderId: string;
    refreshFolder: (folderId: string) => Promise<void>;
}

function FileUpload ({ className, folderId, refreshFolder }: FileUploadProps) {
    const [files, setFiles] = useState<File[]>([]);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const addFiles = (newFiles: FileList | null) => {
        if (!newFiles) return;

        const newArray = Array.from(newFiles);

        setFiles(prev => {
            const existingNames = new Set(prev.map(f => f.name));

            return [
                ...prev,
                ...newArray.filter(f => !existingNames.has(f.name))
            ];
        });
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }

    const uploadFiles = async () => {
        for (const file of files) {
            try {
                const response = await uploadFileApi(folderId, file);

                if (!response) {
                    toast.error(`Something wrong happened! Couldn't upload file ${file.name}`);
                    throw Error("No response found");
                }
                if (response.moderationMessage) {
                    response.moderationStatus === "SERIOUS_WARNING"
                        ? toast.error(response.moderationMessage, { duration: 10000 })
                        : toast(response.moderationMessage, { duration: 7000 });
                }
            } catch (error: any) {
                if (error.response?.status === 401) {
                    console.error("Token Expired");
                    logout();
                    toast.error("Token Expired. You have been logged out. Please log in to continue");
                    navigate('/login')
                // handle logout or redirect
                }
                const moderationMessage = error.response?.data?.message?.message
                    || error.response?.data?.message;
                toast.error(
                    typeof moderationMessage === "string"
                        ? moderationMessage
                        : `Couldn't upload ${file.name}.`,
                    { duration: 10000 },
                );
            }
        }
        
        await refreshFolder(folderId);
        setFiles([]);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className={className}>
                    Upload Files
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[50%]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        uploadFiles();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>
                            Upload Files
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Please select files to upload
                    </DialogDescription>
                    <FieldGroup>
                        {files.map((file, index) => (
                            <div className="-mb-5 w-full min-w-0 border flex flex-row items-center gap-2 px-2 py-1 rounded-md" key={index}>
                                <span className="min-w-0 truncate" title={file.name}>
                                    {file.name}
                                </span>
                                <Button asChild className="ml-auto bg-white hover:bg-gray-100 h-6 w-6" onClick={() => removeFile(index)}>
                                    <span>
                                        <XIcon className="text-black"/>
                                    </span>
                                </Button>
                            </div>
                        ))}
                        <Field>
                            <Label htmlFor="upload-file" className="mt-2">
                                Select Files
                            </Label>
                            <Input id="upload-file" name="upload-file" type="file" multiple value={""} onChange={(e) => addFiles(e.target.files)}/>
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="pt-3">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" className="bg-main hover:bg-main-hover">
                                Upload
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                    </form>
            </DialogContent>
        </Dialog>
    );
}


type DeleteDocumentProps = {
    className?: string;
    title: string;
    submit: (documentId: string) => Promise<void>;
    document: any;
    destructive?: boolean;
    getRelatedPosts?: (documentId: string) => Promise<PostUsage[]>;
    getRelatedFiles?: (documentId: string) => Promise<FilePostUsage[]>;
}

type PostUsage = {
    id: string;
    title?: string | null;
}

type FilePostUsage = {
    id: string;
    name: string;
    path: string;
    posts: PostUsage[];
}

function DeleteDocument ({
    className,
    title,
    submit,
    document,
    destructive = false,
    getRelatedPosts,
    getRelatedFiles,
}: DeleteDocumentProps) {
    const [open, setOpen] = useState(false);
    const [relatedPosts, setRelatedPosts] = useState<PostUsage[]>([]);
    const [relatedFiles, setRelatedFiles] = useState<FilePostUsage[]>([]);
    const [showPostWarning, setShowPostWarning] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const resetWarning = () => {
        setRelatedPosts([]);
        setRelatedFiles([]);
        setShowPostWarning(false);
        setIsChecking(false);
        setIsDeleting(false);
    }

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen);

        if (!nextOpen) {
            resetWarning();
        }
    }

    const confirmDelete = async () => {
        try {
            setIsDeleting(true);
            await submit(document.id);
            setOpen(false);
        } catch (error: any) {
            if (error.response?.status !== 401) {
                toast.error(`Couldn't delete ${document.name}.`);
            }
        } finally {
            setIsDeleting(false);
        }
    }

    const reviewDelete = async () => {
        if (!getRelatedPosts && !getRelatedFiles) {
            await confirmDelete();
            return;
        }

        try {
            setIsChecking(true);
            if (getRelatedFiles) {
                const files = await getRelatedFiles(document.id);

                if (files.length > 0) {
                    setRelatedFiles(files);
                    setShowPostWarning(true);
                    return;
                }
            } else if (getRelatedPosts) {
                const posts = await getRelatedPosts(document.id);

                if (posts.length > 0) {
                    setRelatedPosts(posts);
                    setShowPostWarning(true);
                    return;
                }
            }
        } catch {
            toast.error(getRelatedFiles
                ? "Couldn't check whether this folder contains files used in any posts."
                : "Couldn't check whether this file is used in any posts.");
            return;
        } finally {
            setIsChecking(false);
        }

        await confirmDelete();
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <span className={className}>
                    Delete
                </span>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center">
                <DialogHeader className="flex flex-col items-center">
                    <DialogTitle>
                        {showPostWarning
                            ? `Delete ${title} used in posts?`
                            : `Delete ${title} ${document.name}?`}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {showPostWarning
                        ? relatedFiles.length > 0
                            ? `Deleting ${document.name} will delete files that are used in the following posts:`
                            : `Deleting ${document.name} will also remove it from the following posts:`
                        : "This action cannot be undone."}
                </DialogDescription>
                {showPostWarning && relatedFiles.length > 0 && (
                    <ul className="max-h-64 w-full list-disc space-y-2 overflow-y-auto pl-6 text-sm">
                        {relatedFiles.map((file) => (
                            <li key={file.id}>
                                <span className="font-medium">{file.path}</span>
                                <ul className="mt-1 list-disc space-y-1 pl-6 text-muted-foreground">
                                    {file.posts.map((post) => (
                                        <li key={post.id}>
                                            {post.title?.trim() || `Untitled post (${post.id})`}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
                {showPostWarning && relatedFiles.length === 0 && (
                    <ul className="max-h-48 w-full list-disc space-y-1 overflow-y-auto pl-6 text-sm">
                        {relatedPosts.map((post) => (
                            <li key={post.id}>
                                {post.title?.trim() || `Untitled post (${post.id})`}
                            </li>
                        ))}
                    </ul>
                )}
                <DialogFooter className="pt-3 w-full">
                    <DialogClose asChild>
                        <Button variant="outline" className="flex-1">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        variant={destructive ? "destructive" : "default"}
                        className="flex-1"
                        disabled={isChecking || isDeleting}
                        onClick={showPostWarning ? confirmDelete : reviewDelete}
                    >
                        {isChecking
                            ? "Checking..."
                            : isDeleting
                                ? "Deleting..."
                                : showPostWarning
                                    ? "Delete anyway"
                                    : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
