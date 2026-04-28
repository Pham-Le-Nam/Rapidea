import { getRecentSidebarApi } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { ArrowDownIcon, ArrowUpIcon, PanelLeftCloseIcon } from "lucide-react";
import { useEffect, useState } from "react";
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
    SidebarContent
} from "@/components/ui/sidebar";

type SidebarActivityItem = {
    id: string;
    title: string;
    link: string;
    activityAt: string;
}

type SidebarActivity = {
    ownedCourses: SidebarActivityItem[];
    ownedPosts: SidebarActivityItem[];
    viewedOrSubscribedCourses: SidebarActivityItem[];
    viewedOrSubscribedPosts: SidebarActivityItem[];
}

type SidebarSectionProps = {
    title: string;
    items: SidebarActivityItem[];
    showAll: boolean;
    onToggleShowAll: () => void;
}

function SidebarSection({
    title,
    items,
    showAll,
    onToggleShowAll,
}: SidebarSectionProps) {
    const collapseNumber = 5;
    const visibleItems = showAll ? items : items.slice(0, collapseNumber);
    const canToggle = items.length > collapseNumber;

    return (
        <SidebarMenuItem>
            <SidebarMenuButton>
                <text className="font-bold">
                    {title}
                </text>
            </SidebarMenuButton>

            <SidebarMenuSub>
                <SidebarMenuSubItem>
                    {visibleItems.length === 0 ? (
                        <span className="px-2 text-xs text-gray-500">No recent activity</span>
                    ) : visibleItems.map((item) => (
                        <SidebarMenuSubButton key={item.id} asChild>
                            <Link to={item.link} title={item.title}>
                                <span className="truncate font-normal">{item.title}</span>
                            </Link>
                        </SidebarMenuSubButton>
                    ))}
                </SidebarMenuSubItem>

                {canToggle && (
                    <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                            <button onClick={onToggleShowAll} className="w-full">
                                <div className="flex items-center gap-1">
                                    {showAll ? (
                                        <>
                                            Show Less
                                            <ArrowUpIcon className="size-4" />
                                        </>
                                    ) : (
                                        <>
                                            Show More
                                            <ArrowDownIcon className="size-4" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                )}
            </SidebarMenuSub>
        </SidebarMenuItem>
    );
}

export function LeftSidebar () {
    const { isLoggedIn } = useAuth();
    const [activity, setActivity] = useState<SidebarActivity>({
        ownedCourses: [],
        ownedPosts: [],
        viewedOrSubscribedCourses: [],
        viewedOrSubscribedPosts: [],
    });
    const [showAllBySection, setShowAllBySection] = useState<Record<string, boolean>>({});

    const loadActivity = async () => {
        if (!isLoggedIn) {
            setActivity({
                ownedCourses: [],
                ownedPosts: [],
                viewedOrSubscribedCourses: [],
                viewedOrSubscribedPosts: [],
            });
            return;
        }

        try {
            const response = await getRecentSidebarApi();

            setActivity({
                ownedCourses: response.ownedCourses ?? [],
                ownedPosts: response.ownedPosts ?? [],
                viewedOrSubscribedCourses: response.viewedOrSubscribedCourses ?? [],
                viewedOrSubscribedPosts: response.viewedOrSubscribedPosts ?? response.viewedPosts ?? [],
            });
        } catch (error) {
            console.error("Couldn't load recent sidebar activity", error);
            setActivity({
                ownedCourses: [],
                ownedPosts: [],
                viewedOrSubscribedCourses: [],
                viewedOrSubscribedPosts: [],
            });
        }
    }

    useEffect(() => {
        loadActivity();
    }, [isLoggedIn]);

    const toggleSection = (section: string) => {
        setShowAllBySection((current) => ({
            ...current,
            [section]: !current[section],
        }));
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="text-xl">
                        <SidebarTrigger>
                            <PanelLeftCloseIcon />
                        </SidebarTrigger>
                        Menu
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            
            <SidebarContent>
                <SidebarMenu>
                    <SidebarSection
                        title="Your Courses"
                        items={activity.ownedCourses}
                        showAll={!!showAllBySection.ownedCourses}
                        onToggleShowAll={() => toggleSection("ownedCourses")}
                    />

                    <SidebarSection
                        title="Your Posts"
                        items={activity.ownedPosts}
                        showAll={!!showAllBySection.ownedPosts}
                        onToggleShowAll={() => toggleSection("ownedPosts")}
                    />

                    <SidebarSection
                        title="Interested Courses"
                        items={activity.viewedOrSubscribedCourses}
                        showAll={!!showAllBySection.viewedOrSubscribedCourses}
                        onToggleShowAll={() => toggleSection("viewedOrSubscribedCourses")}
                    />

                    <SidebarSection
                        title="Interested  Posts"
                        items={activity.viewedOrSubscribedPosts}
                        showAll={!!showAllBySection.viewedOrSubscribedPosts}
                        onToggleShowAll={() => toggleSection("viewedOrSubscribedPosts")}
                    />
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
