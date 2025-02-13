import { useEffect } from "react";
import { db } from "../../firebase";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
const testUnauthorizedFirestoreRead = async () => {
  try {
    const flashcardsRef = collection(db, "users/5555AAAA/flashcards");
    const snapshot = await getDocs(flashcardsRef);

    if (snapshot.empty) {
      console.log("📭 No documents found (but request succeeded, meaning it's not blocked).");
    } else {
      console.log("❌ ERROR: Unauthenticated user was able to access data!");
    }
  } catch (error) {
    console.error("✅ Expected permission error:", error);
  }
};
const HomePage = () => {
  const { user } = useAuth(); // Get logged-in user

  useEffect(() => {
    testUnauthorizedFirestoreRead();
    const testUnauthorizedAccess = async () => {
      if (!user) {
        console.log("⛔ User not authenticated. Exiting.");
        return;
      }

      try {
        const userRef = doc(db, "users", testUserId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          console.log("❌ Unauthorized access SUCCESSFUL. Firestore returned:", userSnap.data());
        } else {
          console.log("✅ Unauthorized access BLOCKED. No data returned.");
        }
      } catch (error) {
        console.error("🚨 Firestore access error (expected if security rules are correct):", error);
      }
    };

    testUnauthorizedAccess();
  }, [user]);

  return (
    <div>
      <h1>I am the homepage</h1>
      <p>
        This will be a landing page with a nav with links to login and signup, and a hero section introducing
        the product.
      </p>
    </div>
  );
};

export default HomePage;
