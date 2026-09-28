import type { ReactNode } from "react";

export function ChatPanelFrame({
    header,
    children,
    footer,
}: {
    header: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
}) {
    return (
        <section className="w-[min(26rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
            <header className="flex min-h-14 items-center justify-between border-b border-gray-100 px-3">
                {header}
            </header>
            <div className="flex h-[28rem] flex-col">
                <div className="min-h-0 flex-1">{children}</div>
                {footer && <div className="border-t border-gray-100">{footer}</div>}
            </div>
        </section>
    );
}
