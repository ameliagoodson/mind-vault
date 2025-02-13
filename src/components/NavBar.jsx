import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../pages/Login/LogoutButton";

const NavBar = () => {
  const { user } = useAuth(); // Get logged-in user

  return (
    <nav>
      <div>
        <Link to="/" className="mr-4">
          Home
        </Link>
        {user && (
          <div>
            <Link to="/dashboard" className="mr-4">
              Dashboard
            </Link>
            <Link to="/study" className="mr-4">
              Study
            </Link>
          </div>
        )}
      </div>
      <div>{user ? <LogoutButton /> : <Link to="/login">Login</Link>}</div>
    </nav>
  );
};

export default NavBar;
