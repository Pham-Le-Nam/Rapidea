import { useAuth } from "@/context/AuthContext";
import React from "react";

function Logout() {
  const { logout } = useAuth();

  // Call logout when the component mounts
  React.useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="rounded-md py-1 mr-0 shadow-md min-w-screen md:min-w-3/4">
        <h1 className="text-3xl font-bold text-center">You have been logged out</h1>
        <p className="text-center"> <a href="/login" className="text-main hover:underline font-bold">Login</a> to continue the lessons</p>
      </div>
    </div>
  );
}

export default Logout;