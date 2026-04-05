import { useEditor, EditorContent, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Color from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { 
    Bold,
    Italic,
    Underline,
    Heading2,
    Link as LinkIcon,
    Type as ColorIcon,
} from "lucide-react"
import Heading from "@tiptap/extension-heading";
import { Toggle } from "./toggle"
import { useEffect } from "react"

type EditorContentType = Record<string, any>

function TextEditor({
    value,
    onChange,
}: {
    value?: EditorContentType
    onChange?: (content: EditorContentType) => void
}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Color,
            Heading.configure({ 
                HTMLAttributes: {
                    class: "text-xl font-bold",
                    levels: [2],
                },
            }),
        ],
        content: value || "<p>Start writing your post...</p>",
        onUpdate: ({ editor }) => {
            onChange?.(editor.getJSON())
        },
    })

    if (!editor) return null

    return (
        <div className="border rounded-lg p-4">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} className="outline-none" />
        </div>
    )
}

type TextRendererProps = {
    content: EditorContentType;
    className?: string;
}

const TextRenderer = ({ content, className }: TextRendererProps) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content ?? "", // initial fallback
        editable: false,
    });

    useEffect(() => {
        if (editor && content) {
            editor.commands.setContent(content);
        }
    }, [editor, content]);

    return <EditorContent editor={editor} className={className} />;
};

function Toolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({
            bold: editor.isActive("bold"),
            italic: editor.isActive("italic"),
            underline: editor.isActive("underline"),
            h2: editor.isActive("heading", { level: 2 }),
            red: editor.isActive("textStyle", { color: "red" }),
        }),
    })

    if (!editor) return null

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
                pressed={editorState.red}
                onPressedChange={() => editor.chain().focus().setColor("red").run()}
                variant="outline"
            >
                <ColorIcon className="h-4 w-4" />
            </Toggle>
        </div>
    )
}

export {
    TextEditor,
    TextRenderer,
}