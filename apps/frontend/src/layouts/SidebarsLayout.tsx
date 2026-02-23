import { Outlet } from "react-router-dom";
import { PanelLeftOpenIcon } from "lucide-react";

import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout() {
    return (
        <div className="flex w-full">

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
            <div className="flex flex-col w-full">
                <div className="py-16">
                    <Outlet />
                </div>
            </div>

            {/* Automatically open if not in mobile device */}
            <SidebarProvider className="flex-1">
                <RightSidebar />
                <SidebarTrigger className="fixed right-2 mt-2 z-0 min-w-12 min-h-12 rounded-full border-2">
                    <div>
                        SMS
                    </div>
                </SidebarTrigger>
            </SidebarProvider>

        </div>
  )
}