import { Button } from "@/components/ui/button";
import { 
    ChevronLeftIcon, 
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
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createFolderApi, deleteFileApi, deleteFolderApi, getFileApi, getFolderApi, renameFolderApi, updateFileApi, uploadFileApi } from "@/api";
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
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FilesProp = {
    course: any,
    addFile?: (file: any) => Promise<void>,
}

function Files ({ course, addFile }: FilesProp) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [folder, setFolder] = useState<any>();
    const [isOwner, setIsOwner] = useState(false);
    const [childrenFolders, setChildrenFolder] = useState([]);
    const [childrenFiles, setChildrenFiles] = useState([]);
    const [isRootFolder, setIsRootFolder] = useState(true);
    const [newFolderName, setNewFolderName] = useState("");
    const [newFileName, setNewFileName] = useState("");

    const loadFolder = async (folderId: string) => {
        try {
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
            setIsRootFolder(folderId === course.folderId);
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

            window.open(`${import.meta.env.VITE_API_URL}/${response}`, '_blank');
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
        loadFolder(course.folderId);
    }, [course]);

    return (
        <div className="flex flex-col items-center justify-start rounded-md border shadow-md w-full gap-3">
            
            <div className="relative w-full flex items-center border-b-2 h-8">
                {!isRootFolder && (
                    <Button asChild className="absolute left-0 hover:bg-gray-100 border-r-2 h-full bg-white" onClick={() => loadFolder(folder.parentId)}>
                        <span>
                            <ChevronLeftIcon className="text-black" />
                        </span>
                    </Button>
                ) }

                <p className="mx-auto text-lg font-medium">
                    {folder ? folder.name : "Loading..."}
                </p>

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

                            <DropdownMenuItem asChild>
                                <FileUpload className="hover:bg-gray-100 w-full text-lg" folderId={folder?.id} reloadFolder={loadFolder}/>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
            
            <div className="flex flex-col justify-center items-center px-2 mb-2 w-full">
                {childrenFolders.map((childFolder: any) => (
                    <div className="flex flex-row justify-start items-center w-full" key={childFolder.name}>
                        <Button 
                            className="flex-1 min-w-0 flex items-center justify-start gap-2 rounded-full bg-white hover:bg-gray-100 text-black text-lg p-2 font-normal [&>svg]:w-5 [&>svg]:h-5"
                            onClick={() => loadFolder(childFolder.id)}
                        >
                            <FolderIcon />
                            {childFolder.name}
                        </Button>

                        {isOwner && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="hover:bg-gray-100 h-full bg-white">
                                    <Button variant="outline" className="border-0 rounded-full">
                                        <PlusIcon />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <DocumentName submit={() => renameFolder(childFolder.id, newFolderName)} value={newFolderName} setValue={setNewFolderName} title="Rename" className="hover:bg-gray-100 w-full text-lg"/>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <DeleteDocument title="Folder" submit={deleteFolder} document={childFolder} className="hover:bg-gray-100 w-full text-lg"/>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                ))}

                {childrenFiles.map((childFile: any) => (
                    <div className="flex flex-row justify-start items-center w-full" key={childFile.name}>
                        <Button 
                            className="flex-1 min-w-0 flex items-center justify-start gap-2 rounded-full bg-white hover:bg-gray-100 text-black text-lg p-2 font-normal [&>svg]:w-5 [&>svg]:h-5"
                            onClick={() => addFile ? addFile(childFile) : openFile(childFile.id)}
                            onDoubleClick={() => openFile(childFile.id)}
                        >
                            <FileIcon />
                            {childFile.name}
                        </Button>

                        {isOwner && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="hover:bg-gray-100 h-full bg-white">
                                    <Button variant="outline" className="border-0 rounded-full">
                                        <PlusIcon />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <DocumentName submit={() => renameFile(childFile.id, newFileName)} value={newFileName} setValue={setNewFileName} title="Rename File" className="hover:bg-gray-100 w-full text-lg"/>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <DeleteDocument title="File" submit={deleteFile} document={childFile} className="hover:bg-gray-100 w-full text-lg"/>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}                        
                    </div>
                ))}
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
    reloadFolder: (folderId: string) => Promise<void>;
}

function FileUpload ({ className, folderId, reloadFolder }: FileUploadProps) {
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
            } catch (error: any) {
                if (error.response?.status === 401) {
                    console.error("Token Expired");
                    logout();
                    toast.error("Token Expired. You have been logged out. Please log in to continue");
                    navigate('/login')
                // handle logout or redirect
                }
                toast.error(`File name ${file.name} already exists! Please change the file name and try again.`);
            }
        }
        
        reloadFolder(folderId);
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
                            <div className="-mb-5 w-full border flex flex-row items-center px-2 py-1 rounded-md" key={index}>
                                {file.name}
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
}

function DeleteDocument ({ className, title, submit, document }: DeleteDocumentProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className={className}>
                    Delete
                </span>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center">
                <DialogHeader className="flex flex-col items-center">
                    <DialogTitle>
                        {`Delete ${title} ${document.name}?`}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    This action cannot be undone.
                </DialogDescription>
                <DialogFooter className="pt-3 w-full">
                    <DialogClose asChild>
                        <Button variant="outline" className="flex-1">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" className="bg-main hover:bg-main-hover flex-1" onClick={() => submit(document.id)}>
                            Delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
