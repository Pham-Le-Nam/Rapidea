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
import Course from './modules/course/Course.tsx';


function App() {

    return (
        <Router>
            <Toaster position="top-right" reverseOrder={false} />
            <Routes>
                <Route element={<MainLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                {/* <Route path="/" element={<Homepage />} /> */}
                <Route element={<SidebarsLayout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route path="/course/:username" element={<Course />} />
                </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
