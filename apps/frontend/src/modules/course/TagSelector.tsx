import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTagsApi, suggestTagsApi } from "@/api";
import { SparklesIcon, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type TagSelectorProps = {
    value: string[];
    onChange: (tags: string[]) => void;
    suggestionText?: string;
};

function TagSelector({ value, onChange, suggestionText = "" }: TagSelectorProps) {
    const [availableTags, setAvailableTags] = useState<string[]>([]);
    const [query, setQuery] = useState("");
    const [isSuggesting, setIsSuggesting] = useState(false);

    useEffect(() => {
        loadTags();
    }, []);

    const selectedTags = useMemo(() => Array.from(new Set(value.map((tag) => tag.trim().toLowerCase()).filter(Boolean))), [value]);
    const filteredTags = availableTags
        .filter((tag) => tag.includes(query.trim().toLowerCase()))
        .filter((tag) => !selectedTags.includes(tag))
        .slice(0, 24);

    const loadTags = async () => {
        try {
            const tags = await getTagsApi();
            setAvailableTags(tags.map((tag: any) => tag.name));
        } catch {
            toast.error("Couldn't load tags");
        }
    }

    const addTag = (tag: string) => {
        const normalizedTag = tag.trim().toLowerCase();

        if (!normalizedTag || selectedTags.includes(normalizedTag)) {
            return;
        }

        onChange([...selectedTags, normalizedTag]);
        setQuery("");
    }

    const removeTag = (tag: string) => {
        onChange(selectedTags.filter((selectedTag) => selectedTag !== tag));
    }

    const suggestTags = async () => {
        try {
            if (!suggestionText.trim()) {
                toast.error("Add title or content before suggesting tags");
                return;
            }

            setIsSuggesting(true);
            const suggestedTags = await suggestTagsApi(suggestionText, 5);
            onChange(Array.from(new Set([...selectedTags, ...suggestedTags.map((tag: any) => tag.name)])));
        } catch {
            toast.error("Couldn't suggest tags");
        } finally {
            setIsSuggesting(false);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
                <Label htmlFor="tag-search">Tags</Label>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    disabled={isSuggesting}
                    onClick={suggestTags}
                >
                    <SparklesIcon className="size-4" />
                    Suggest
                </Button>
            </div>

            <div className="flex min-h-10 flex-wrap items-center gap-2 rounded-md border px-2 py-2">
                {selectedTags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm">
                        {tag}
                        <button type="button" className="rounded-sm hover:bg-gray-200" onClick={() => removeTag(tag)}>
                            <XIcon className="size-3" />
                        </button>
                    </span>
                ))}
                <Input
                    id="tag-search"
                    value={query}
                    placeholder="Search tags"
                    className="h-8 min-w-40 flex-1 border-0 shadow-none focus-visible:ring-0"
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            addTag(query);
                        }
                    }}
                />
            </div>

            {filteredTags.length > 0 && (
                <div className="flex max-h-34 flex-wrap gap-2 overflow-y-auto rounded-md border p-2">
                    {filteredTags.map((tag) => (
                        <Button key={tag} type="button" variant="outline" size="sm" onClick={() => addTag(tag)}>
                            {tag}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}

export function getTagNames(entity?: any) {
    return entity?.tags?.map((tagEntry: any) => tagEntry.tag?.name ?? tagEntry.name).filter(Boolean) ?? [];
}

export function extractTextFromEditorContent(content: any): string {
    if (!content) {
        return "";
    }

    if (typeof content === "string") {
        return content;
    }

    if (Array.isArray(content)) {
        return content.map(extractTextFromEditorContent).join(" ");
    }

    if (typeof content === "object") {
        return [
            typeof content.text === "string" ? content.text : "",
            extractTextFromEditorContent(content.content),
        ].filter(Boolean).join(" ");
    }

    return "";
}

export default TagSelector;
