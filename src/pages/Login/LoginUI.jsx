// Login.jsx
import React, { useEffect, useState } from "react";
import { startFirebaseUI, cleanupFirebaseUI, handleLogout } from "./FirebaseAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Redirect authenticated user to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
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
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // Show dashboard if logged in
  if (user) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1>Welcome, {user.email}!</h1>
          <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
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
