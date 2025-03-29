// LoginUI.jsx
import { useEffect, useState } from "react";
import {
  startFirebaseUI,
  cleanupFirebaseUI,
  handleLogout,
} from "./FirebaseAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Redirect authenticated user to dashboard
  useEffect(() => {
    if (user) {
      navigate("/study");
    }
  }, [user, navigate]);

  // Initialize Firebase UI (Fixed)
  useEffect(() => {
    if (!user) {
      const uiContainer = document.getElementById("firebaseui-auth-container");
      if (uiContainer) {
        try {
          startFirebaseUI("#firebaseui-auth-container");
        } catch (err) {
          setError(err.message);
          console.error("Error initializing Firebase UI:", err);
        }
      } else {
        console.error("Firebase UI container not found!");
      }
    }

    return () => {
      cleanupFirebaseUI();
    };
  }, [user]);

  // Logout function
  const onLogout = async () => {
    try {
      await handleLogout();
    } catch (error) {
      setError(error.message);
      console.error("Logout failed:", error);
    }
  };

  // Error handling
  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 rounded bg-blue-500 px-4 py-2 text-white">
          Retry
        </button>
      </div>
    );
  }

  // Show dashboard if logged in
  if (user) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1>Welcome, {user.email}!</h1>
          <button
            onClick={onLogout}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Show login UI if logged out
  return (
    <div className="p-4">
      <h1>Login</h1>
      <div id="firebaseui-auth-container"></div> {/* ✅ Ensure this exists */}
    </div>
  );
};

export default Login;
