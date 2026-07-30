import Homepage from './modules/homepage/Homepage.tsx';
import Login from './modules/login/Login.tsx';
import Register from './modules/register/Register.tsx';
import MainLayout from "./layouts/MainLayout.tsx";
import ForgotPassword from './modules/forgot-password/ForgotPassword.tsx';
import Logout from './modules/logout/Logout.tsx';
import ResetPassword from './modules/reset-password/ResetPassword.tsx';
import SidebarsLayout from './layouts/SidebarsLayout.tsx';
import Profile from './modules/profile/Profile.tsx';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Courses from './modules/courses/Courses.tsx';
import Course from './modules/course/Course.tsx';
import { Post } from './modules/course/Posts.tsx';
import UserPosts from './modules/posts/UserPosts.tsx';
import UserFiles from './modules/files/UserFiles.tsx';
import PayoutSettings from './modules/settings/PayoutSettings.tsx';
import AuthCallback from './modules/login/AuthCallback.tsx';
import EmailVerify from './modules/login/EmailVerify.tsx';
import CreatorAiSettings from './modules/settings/CreatorAiSettings.tsx';
import NotificationsPage from './modules/notifications/NotificationsPage.tsx';
import AdminModeration from './modules/admin/AdminModeration.tsx';


function App() {

    return (
        <Router>
            <Toaster position="top-right" reverseOrder={false} />
            <Routes>
                <Route element={<MainLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/auth/email/verify" element={<EmailVerify />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                {/* <Route path="/" element={<Homepage />} /> */}
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
        </Router>
    )
}

export default App
