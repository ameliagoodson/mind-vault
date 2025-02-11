// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // ✅ Using modern Firebase SDK
import { onAuthStateChanged } from "firebase/auth"; // ✅ Importing modular function

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Use the modern onAuthStateChanged function with auth
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={{ user, isAuthenticated: !!user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
