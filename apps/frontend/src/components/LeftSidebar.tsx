import { PanelLeftCloseIcon, ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react"

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

export function LeftSidebar () {
    const collapseNumber = 5;

    const [showAllCourses, setShowAllCourses] = useState(false);
    const courses = [
        {title: "Course 0", link: "/homepage"},
        {title: "Course 1", link: "/login"},
        {title: "Course 2", link: "/register"},
        {title: "Course 3", link: "/"},
        {title: "Course 4", link: "/login"},
        {title: "Course 5", link: "/register"},
        {title: "Course 6", link: "/"},
        {title: "Course 7", link: "/login"},
        {title: "Course 8", link: "/homepage"},
        {title: "Course 9", link: "/homepage"},
        {title: "Course 10", link: "/"},
        {title: "Course 11", link: "/"},
        {title: "Course 12", link: "/homepage"},
        {title: "Course 13", link: "/"},
        {title: "Course 14", link: "/homepage"},
        {title: "Course 15", link: "/"},
        {title: "Course 16", link: "/homepage"},
        {title: "Course 17", link: "/"},
        {title: "Course 18", link: "/homepage"},
        {title: "Course 19", link: "/"},
    ];
    const visibleCourses = showAllCourses ? courses : courses.slice(0, collapseNumber);

    const [showAllPosts, setShowAllPosts] = useState(false);
    const posts = [
        {title: "Post 0", link: "/"},
        {title: "Post 1", link: "/login"},
        {title: "Post 2", link: "/register"},
        {title: "Post 3", link: "/"},
        {title: "Post 4", link: "/login"},
        {title: "Post 5", link: "/register"},
        {title: "Post 6", link: "/"},
        {title: "Post 7", link: "/login"},
        {title: "Post 8", link: "/homepage"},
        {title: "Post 9", link: "/homepage"},
        {title: "Post 10", link: "/"},
        {title: "Post 11", link: "/"},
        {title: "Post 12", link: "/homepage"},
        {title: "Post 13", link: "/"},
        {title: "Post 14", link: "/homepage"},
        {title: "Post 15", link: "/"},
        {title: "Post 16", link: "/homepage"},
        {title: "Post 17", link: "/"},
        {title: "Post 18", link: "/homepage"},
        {title: "Post 19", link: "/"},
    ];
    const visiblePosts = showAllPosts ? posts : posts.slice(0, collapseNumber);

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
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to='/login'>
                                Courses
                            </Link>
                        </SidebarMenuButton>

                        <SidebarMenuSub>
                            <SidebarMenuSubItem>
                                {visibleCourses.map((course) => (
                                    <SidebarMenuSubButton key={course.title} asChild>
                                        <Link to={course.link}>
                                            {course.title}
                                        </Link>
                                    </SidebarMenuSubButton>
                                ))}
                            </SidebarMenuSubItem>

                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    <button onClick={() => setShowAllCourses((isShow) => !isShow)} className="w-full">
                                        <div className="flex">
                                            {showAllCourses ? (
                                                <div className="flex">
                                                    Show Less
                                                    <ArrowUpIcon />
                                                </div>
                                            ) : (
                                                <div className="flex">
                                                    Show More
                                                    <ArrowDownIcon />
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to='/login'>
                                Posts
                            </Link>
                        </SidebarMenuButton>

                        <SidebarMenuSub>
                            <SidebarMenuSubItem>
                                {visiblePosts.map((post) => (
                                    <SidebarMenuSubButton key={post.title} asChild>
                                        <Link to={post.link}>
                                            {post.title}
                                        </Link>
                                    </SidebarMenuSubButton>
                                ))}
                            </SidebarMenuSubItem>

                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    <button onClick={() => setShowAllPosts((isShow) => !isShow)} className="w-full">
                                        <div className="flex">
                                            {showAllPosts ? (
                                                <div className="flex">
                                                    Show Less
                                                    <ArrowUpIcon />
                                                </div>
                                            ) : (
                                                <div className="flex">
                                                    Show More
                                                    <ArrowDownIcon />
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}