import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import rapideiaLogo from '/rapideia.png'
import { useAuth } from "@/context/AuthContext";

function Navbar() {
    const { isLoggedIn } = useAuth();

    return (
        <nav className="bg-white text-black px-6 py-4 flex justify-between items-center shadow-md flex-wrap">
            <Link to="/">
                <img src={rapideiaLogo} className="size-9 rounded-full" />
            </Link>

            <div className="space-x-6">
                {!isLoggedIn && (
                <Button asChild className="bg-main hover:bg-main-hover">
                    <Link to="/login">Login</Link>
                </Button>
                )}

                {isLoggedIn && (
                <Button asChild className="bg-main hover:bg-main-hover">
                    <Link to="/logout">Logout</Link>
                </Button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;