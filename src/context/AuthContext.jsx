import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Firebase authentication instance
import { onAuthStateChanged } from "firebase/auth";

// Create an Auth Context object. Context is global state
const AuthContext = createContext(null);

// AuthProvider creates components that wraps app all children in App.jsx
// It broadcasts user data to all components inside it
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user info

  useEffect(() => {
    // Listen for login/logout changes
    // onAuthStateChanged returns function that we store in unsubscribe
    // Unsubscribe function = cleanup mechanism. It turns off onAuthStateChanged and stops listening for auth changes.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup when component unmounts
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

// Create a Custom Hook to Use the Context
export const useAuth = () => {
  return useContext(AuthContext);
};
