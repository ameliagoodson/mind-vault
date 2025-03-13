import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const HomePage = () => {
  const { user } = useAuth(); // Get logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/flashcards/create");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container mx-auto max-w-4xl">
        <h1 className="h1">MindVault: Your Brain’s Best Friend</h1>
        <h2>
          Intelligent flashcards, personalized AI review sessions, and smart
          reminders—so what you learn stays with you.
        </h2>
      </div>
    </div>
  );
};

export default HomePage;
