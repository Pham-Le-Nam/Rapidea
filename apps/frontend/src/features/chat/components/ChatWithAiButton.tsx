import { SparklesIcon } from "lucide-react";
import type { ComponentProps, MouseEvent } from "react";

import { Button } from "@/shared/components/ui/button";
import { openAiChat } from "../events";
import type { AiAssistantMode, AiChatTrustedSourceType } from "../model/types";

type ChatWithAiButtonProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
    sourceType: AiChatTrustedSourceType;
    sourceId: string;
    sourceLabel?: string;
    mode?: AiAssistantMode;
};

export function ChatWithAiButton({
    sourceType,
    sourceId,
    sourceLabel,
    mode,
    children = "Chat with AI",
    ...buttonProps
}: ChatWithAiButtonProps) {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        openAiChat({
            mode,
            reuseActiveConversation: true,
            trustedSourcesToAdd: [{ sourceType, sourceId, label: sourceLabel }],
        });
    };

    return (
        <Button type="button" {...buttonProps} onClick={handleClick}>
            <SparklesIcon className="size-4" />
            {children}
        </Button>
    );
}
