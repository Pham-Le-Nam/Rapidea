import { Route, Routes } from "react-router-dom";
import { AdminModeration } from "@/features/admin";
import {
    AuthCallback,
    EmailVerify,
    ForgotPassword,
    Login,
    Logout,
    Register,
    ResetPassword,
} from "@/features/auth";
import { Course, Courses } from "@/features/courses";
import { UserFiles } from "@/features/files";
import { Homepage } from "@/features/home";
import { NotificationsPage } from "@/features/notifications";
import { Post, UserPosts } from "@/features/posts";
import { Profile } from "@/features/profile";
import { CreatorAiSettings, PayoutSettings } from "@/features/settings";
import MainLayout from "../layouts/MainLayout";
import SidebarsLayout from "../layouts/SidebarsLayout";

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/auth/email/verify" element={<EmailVerify />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route element={<SidebarsLayout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route path="/courses/:username" element={<Courses />} />
                    <Route path="/posts/:username" element={<UserPosts />} />
                    <Route path="/files/:username" element={<UserFiles />} />
                    <Route path="/settings/payout" element={<PayoutSettings />} />
                    <Route path="/settings/creator-ai" element={<CreatorAiSettings />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/admin/moderation" element={<AdminModeration />} />
                    <Route path="/course/:id" element={<Course />} />
                    <Route path="/post/:id" element={<Post />} />
                </Route>
            </Route>
        </Routes>
    );
}
