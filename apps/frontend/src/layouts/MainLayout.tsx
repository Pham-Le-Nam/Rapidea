import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
