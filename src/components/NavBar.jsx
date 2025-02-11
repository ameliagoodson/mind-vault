import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../pages/Login/LogoutButton";

const NavBar = () => {
  const { user } = useAuth(); // Get logged-in user

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4">
          Home
        </Link>
        {user && (
          <Link to="/dashboard" className="mr-4">
            Dashboard
          </Link>
        )}
      </div>
      <div>{user ? <LogoutButton /> : <Link to="/login">Login</Link>}</div>
    </nav>
  );
};

export default NavBar;
