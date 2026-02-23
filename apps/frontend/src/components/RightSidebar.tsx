import { PanelRightCloseIcon } from "lucide-react";
import { Link } from "react-router-dom";

import {
    Sidebar,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarTrigger,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from "@/components/ui/sidebar";

export function RightSidebar() {
    return (
        <Sidebar side="right">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="text-xl">
                        <SidebarTrigger>
                            <PanelRightCloseIcon />
                        </SidebarTrigger>
                        Messages
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="text-lg">
                            <Link to='/login'>Subscribers</Link>
                        </SidebarMenuButton>

                        <SidebarMenuSub>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                    <Link to='/login'>Subscriber A</Link>
                                </SidebarMenuSubButton>

                                <SidebarMenuSubButton asChild>
                                    <Link to='/login'>Subscriber B</Link>
                                </SidebarMenuSubButton>

                                <SidebarMenuSubButton asChild>
                                    <Link to='/login'>Subscriber C</Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="text-lg">
                            <Link to='/login'>Subscribing</Link>
                        </SidebarMenuButton>

                        <SidebarMenuSub>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                    <Link to='/login'>Subscribing A</Link>
                                </SidebarMenuSubButton>

                                <SidebarMenuSubButton asChild>
                                    <Link to='/login'>Subscribing B</Link>
                                </SidebarMenuSubButton>

                                <SidebarMenuSubButton asChild>
                                    <Link to='/login'>Subscribing C</Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
        </Sidebar>
    );
}