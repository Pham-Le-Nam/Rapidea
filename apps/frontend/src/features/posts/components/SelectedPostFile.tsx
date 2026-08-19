import { XIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

type SelectedPostFileProps = {
    file: any;
    isSelected: boolean;
    onSelect: () => void;
    onRemove: () => void;
};

export function SelectedPostFile({
    file,
    isSelected,
    onSelect,
    onRemove,
}: SelectedPostFileProps) {
    return (
        <div
            className={`flex w-full min-w-0 flex-row items-center overflow-hidden rounded-md border transition-colors ${
                isSelected ? "border-gray-400 bg-gray-200" : "bg-white"
            }`}
        >
            <button
                type="button"
                className="min-w-0 flex-1 self-stretch px-2 py-1 text-left hover:bg-gray-100"
                title={`View ${file.name}`}
                onClick={onSelect}
                aria-pressed={isSelected}
            >
                <span className="wrap-anywhere whitespace-break-spaces">
                    {file.name}
                </span>
            </button>

            <Button
                type="button"
                className="mx-2 h-6 w-6 shrink-0 bg-white hover:bg-gray-100"
                title={`Remove ${file.name}`}
                onClick={onRemove}
            >
                <XIcon className="text-black" />
            </Button>
        </div>
    );
}
