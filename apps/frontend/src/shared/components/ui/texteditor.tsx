import { useEditor, EditorContent, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Color from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { 
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Heading2,
    List,
    ListOrdered,
    Quote,
    Link as LinkIcon,
    Redo2,
    Unlink,
    Undo2,
    Type as ColorIcon,
} from "lucide-react"
import { Toggle } from "./toggle"
import { useEffect } from "react"
import { cn } from "@/shared/lib/utils"

type EditorContentType = Record<string, any>

const emptyEditorContent: EditorContentType = {
    type: "doc",
    content: [{ type: "paragraph" }],
}

function normalizeEditorContent(content?: EditorContentType) {
    if (content?.type === "doc" && Array.isArray(content.content)) {
        return content;
    }

    return emptyEditorContent;
}

const linkAttributes = {
    class: "text-blue-600 underline underline-offset-2 hover:text-blue-800",
    rel: "noopener noreferrer nofollow",
    target: "_blank",
}

const editorContentClassName = [
    "[&_.ProseMirror]:outline-none",
    "[&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-blue-800",
    "[&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:text-gray-700",
    "[&_ol]:list-decimal [&_ol]:pl-6",
    "[&_ul]:list-disc [&_ul]:pl-6",
    "[&_li]:my-1",
].join(" ");

const normalizeUrl = (url: string) => {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) return "";

    if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmedUrl)) {
        return trimmedUrl;
    }

    return `https://${trimmedUrl}`;
}

function TextEditor({
    value,
    onChange,
}: {
    value?: EditorContentType
    onChange?: (content: EditorContentType) => void
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                link: {
                    autolink: true,
                    defaultProtocol: "https",
                    HTMLAttributes: linkAttributes,
                    linkOnPaste: true,
                    openOnClick: false,
                },
                heading: {
                    HTMLAttributes: {
                        class: "text-xl font-bold",
                    },
                    levels: [2],
                },
            }),
            TextStyle,
            Color,
        ],
        content: normalizeEditorContent(value),
        onUpdate: ({ editor }) => {
            onChange?.(editor.getJSON())
        },
    })

    useEffect(() => {
        if (!editor) return;

        const nextContent = normalizeEditorContent(value);
        const editorContent = editor.getJSON();

        if (JSON.stringify(editorContent) === JSON.stringify(nextContent)) {
            return;
        }

        editor.commands.setContent(nextContent, {
            emitUpdate: false,
        });
    }, [editor, value]);

    if (!editor) return null

    return (
        <div className="border rounded-lg p-4">
            <Toolbar editor={editor} />
            <EditorContent
                editor={editor}
                className={cn("min-h-40 [&_.ProseMirror]:min-h-40", editorContentClassName)}
            />
        </div>
    )
}

type TextRendererProps = {
    content: EditorContentType;
    className?: string;
}

const TextRenderer = ({ content, className }: TextRendererProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                link: {
                    autolink: true,
                    defaultProtocol: "https",
                    HTMLAttributes: linkAttributes,
                    openOnClick: true,
                },
            }),
            TextStyle,
            Color,
        ],
        content: normalizeEditorContent(content),
        editable: false,
    });

    useEffect(() => {
        if (editor && content) {
            editor.commands.setContent(normalizeEditorContent(content));
        }
    }, [editor, content]);

    return <EditorContent editor={editor} className={cn(editorContentClassName, className)} />;
};

function Toolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({
            bold: editor.isActive("bold"),
            italic: editor.isActive("italic"),
            strike: editor.isActive("strike"),
            underline: editor.isActive("underline"),
            h2: editor.isActive("heading", { level: 2 }),
            bulletList: editor.isActive("bulletList"),
            orderedList: editor.isActive("orderedList"),
            blockquote: editor.isActive("blockquote"),
            link: editor.isActive("link"),
            red: editor.isActive("textStyle", { color: "red" }),
            canUndo: editor.can().undo(),
            canRedo: editor.can().redo(),
        }),
    })

    if (!editor) return null

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("Paste a link", previousUrl ?? "");

        if (url === null) return;

        if (!url.trim()) {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href: normalizeUrl(url) }).run();
    }

    return (
        <div className="flex flex-wrap gap-2 mb-3">
            <Toggle
                size="sm"
                pressed={editorState.bold}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                variant="outline"
            >
                <Bold className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editorState.italic}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                variant="outline"
            >
                <Italic className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editorState.strike}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                variant="outline"
                title="Strikethrough"
            >
                <Strikethrough className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editorState.underline}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                variant="outline"
            >
                <Underline className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editorState.h2}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                variant="outline"
            >
                <Heading2 className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editorState.bulletList}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                variant="outline"
                title="Bullet list"
            >
                <List className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editorState.orderedList}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                variant="outline"
                title="Numbered list"
            >
                <ListOrdered className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editorState.blockquote}
                onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                variant="outline"
                title="Quote"
            >
                <Quote className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editorState.link}
                onPressedChange={setLink}
                variant="outline"
                title="Add or edit link"
            >
                <LinkIcon className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={false}
                onPressedChange={() => editor.chain().focus().extendMarkRange("link").unsetLink().run()}
                variant="outline"
                title="Remove link"
            >
                <Unlink className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editorState.red}
                onPressedChange={() => editor.chain().focus().setColor("red").run()}
                variant="outline"
            >
                <ColorIcon className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={false}
                disabled={!editorState.canUndo}
                onPressedChange={() => editor.chain().focus().undo().run()}
                variant="outline"
                title="Undo"
            >
                <Undo2 className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={false}
                disabled={!editorState.canRedo}
                onPressedChange={() => editor.chain().focus().redo().run()}
                variant="outline"
                title="Redo"
            >
                <Redo2 className="h-4 w-4" />
            </Toggle>
        </div>
    )
}

export {
    TextEditor,
    TextRenderer,
}
