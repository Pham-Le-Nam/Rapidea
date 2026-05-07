import { Outlet } from "react-router-dom";
import { useState } from "react";

import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { ChatBox } from "@/modules/chat/ChatBox";
import type { ChatUser } from "@/modules/chat/types";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
                <SidebarTrigger className="fixed left-2 mt-2 z-0 min-w-12 min-h-12 rounded-full border-2">
                    {/* <PanelLeftOpenIcon /> */}
                    <div>
                        Menu
                    </div>
                </SidebarTrigger>
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
                <SidebarTrigger className="fixed right-2 mt-2 z-0 min-w-12 min-h-12 rounded-full border-2">
                    <div>
                        SMS
                    </div>
                </SidebarTrigger>
            </SidebarProvider>

            <ChatBox
                onMessageSent={() => setChatRefreshKey((current) => current + 1)}
            />
        </div>
  )
}
