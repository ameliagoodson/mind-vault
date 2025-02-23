import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const HomePage = ({ cardNum, setCardNum }) => {
  const { user } = useAuth(); // Get logged-in user

  // useEffect(() => {
  //   const testUnauthorizedFirestoreRead = async () => {
  //     try {
  //       const flashcardsRef = collection(db, "users/5555AAAA/flashcards");
  //       const snapshot = await getDocs(flashcardsRef);

  //       if (snapshot.empty) {
  //         console.log("📭 No documents found (but request succeeded).");
  //       } else {
  //         console.log(
  //           "❌ ERROR: Unauthenticated user was able to access data!",
  //         );
  //       }
  //     } catch (error) {
  //       console.error("✅ Expected permission error:", error);
  //     }
  //   };

  //   testUnauthorizedFirestoreRead();
  // }, []);

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
