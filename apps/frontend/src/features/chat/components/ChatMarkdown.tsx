import { Fragment } from "react";
import type { ReactNode } from "react";

/** Render the chat's supported Markdown as React elements; never interpret HTML or model URLs. */
export function formatChatInlineText(text: string): ReactNode {
    const pattern = /\*\*([^\n]+?)\*\*|__([^\n]+?)__|`([^`\n]+)`|\*([^*\n]+)\*|_([^_\n]+)_/g;
    const nodes: ReactNode[] = [];
    let cursor = 0;
    for (const match of text.matchAll(pattern)) {
        nodes.push(text.slice(cursor, match.index));
        const key = match.index;
        if (match[1] || match[2]) nodes.push(<strong key={key}>{match[1] ?? match[2]}</strong>);
        else if (match[3]) nodes.push(<code key={key} className="rounded bg-black/5 px-1 font-mono text-[0.9em]">{match[3]}</code>);
        else nodes.push(<em key={key}>{match[4] ?? match[5]}</em>);
        cursor = match.index + match[0].length;
    }
    nodes.push(text.slice(cursor));
    return <>{nodes}</>;
}

export function ChatMarkdown({ content, renderInline = formatChatInlineText }: {
    content: string;
    renderInline?: (text: string) => ReactNode;
}) {
    const lines = content.replace(/\r\n?/g, "\n").split("\n");
    const blocks: ReactNode[] = [];
    const listItem = (line: string) => line.match(/^\s*(?:([-*+])|\d+[.)])\s+(.+)$/);
    let cursor = 0;
    while (cursor < lines.length) {
        const line = lines[cursor];
        if (!line.trim()) { cursor++; continue; }
        const key = cursor;
        if (/^\s*```/.test(line)) {
            const code: string[] = [];
            cursor++;
            while (cursor < lines.length && !/^\s*```/.test(lines[cursor])) code.push(lines[cursor++]);
            if (cursor < lines.length) cursor++;
            blocks.push(<pre key={key} className="overflow-x-auto rounded bg-black/5 p-2 text-xs"><code>{code.join("\n")}</code></pre>);
        } else if (/^#{1,6}\s+/.test(line)) {
            blocks.push(<h3 key={key} className="font-semibold">{renderInline(line.replace(/^#{1,6}\s+/, ""))}</h3>);
            cursor++;
        } else if (listItem(line)) {
            const ordered = !listItem(line)![1];
            const items: ReactNode[] = [];
            const start = ordered ? Number(line.trim().match(/^\d+/)?.[0] ?? 1) : undefined;
            while (cursor < lines.length) {
                const item = listItem(lines[cursor]);
                if (!item || !item[1] !== ordered) break;
                items.push(<li key={cursor}>{renderInline(item[2])}</li>);
                cursor++;
            }
            blocks.push(ordered
                ? <ol key={key} start={start} className="list-decimal space-y-1 pl-5">{items}</ol>
                : <ul key={key} className="list-disc space-y-1 pl-5">{items}</ul>);
        } else {
            const paragraph: string[] = [line];
            cursor++;
            while (cursor < lines.length && lines[cursor].trim() && !/^#{1,6}\s+|^\s*```/.test(lines[cursor]) && !listItem(lines[cursor])) {
                paragraph.push(lines[cursor++]);
            }
            blocks.push(<p key={key} className="whitespace-pre-wrap">{renderInline(paragraph.join("\n"))}</p>);
        }
    }
    return <div className="space-y-2 break-words leading-5">{blocks.map((block, index) => <Fragment key={index}>{block}</Fragment>)}</div>;
}
