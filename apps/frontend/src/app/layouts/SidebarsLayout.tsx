import { Outlet } from "react-router-dom";
import { useState } from "react";

import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { ChatBox, type ChatUser } from "@/features/chat";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";

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
                <SidebarTrigger className="fixed left-2 mt-2 z-10 min-w-12 min-h-12 rounded-full border-2 bg-white shadow-sm">
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
                <SidebarTrigger className="fixed right-2 mt-2 z-10 min-w-12 min-h-12 rounded-full border-2 bg-white shadow-sm">
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
