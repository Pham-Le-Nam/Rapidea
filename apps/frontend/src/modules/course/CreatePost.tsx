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
import TextEditor from "@/components/ui/texteditor";

type CreatePostProps = {
    className?: string;
}

function CreatePost({ className }: CreatePostProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState<Record<string, any>>({});

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className={className}>
                    +
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[50%]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        // submit();
                        console.log("Content", content);
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
    )
}

export default CreatePost;