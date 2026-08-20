import { Outlet } from "react-router-dom";
import { useState } from "react";

import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { ChatBox, type ChatUser } from "@/features/chat";

import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/shared/components/ui/sidebar";

function ClosedSidebarTrigger({
    side,
    label,
}: {
    side: "left" | "right";
    label: string;
}) {
    const { isMobile, open, openMobile } = useSidebar();
    const isOpen = isMobile ? openMobile : open;

    if (isOpen) return null;

    return (
        <SidebarTrigger
            className={`fixed ${side === "left" ? "left-2" : "right-2"} mt-2 z-10 min-w-12 min-h-12 rounded-full border-2 bg-white shadow-sm`}
        >
            <div>{label}</div>
        </SidebarTrigger>
    );
}

export default function Layout() {
    const [chatRefreshKey, setChatRefreshKey] = useState(0);

    const openChat = (user: ChatUser) => {
        window.dispatchEvent(new CustomEvent("rapidea:open-chat", {
            detail: user,
        }));
    };

    return (
        <div className="flex flex-row items-start w-full">

            {/* Automatically open if not in mobile device */}
            <SidebarProvider className="flex-1">
                <LeftSidebar />
                <ClosedSidebarTrigger side="left" label="Menu" />
            </SidebarProvider>

            {/* MAIN CONTENT */}
            <div className="flex flex-col items-center w-full py-16">
                <Outlet />
            </div>

            {/* Automatically open if not in mobile device */}
            <SidebarProvider className="flex-1">
                <RightSidebar
                    refreshKey={chatRefreshKey}
                    onSelectChat={openChat}
                />
                <ClosedSidebarTrigger side="right" label="SMS" />
            </SidebarProvider>

            <ChatBox
                onMessageSent={() => setChatRefreshKey((current) => current + 1)}
            />
        </div>
  )
}
