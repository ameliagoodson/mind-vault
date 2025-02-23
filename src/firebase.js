import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore setup

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mind-vault-ai.firebaseapp.com",
  projectId: "mind-vault-ai",
  storageBucket: "mind-vault-ai.firebasestorage.app",
  messagingSenderId: "905133813341",
  appId: "1:905133813341:web:f97d8172fdd4a9276627b4",
  measurementId: "G-NTW262CV7Y",
};

// ✅ Initializes/starts my Firebase app instance using my credentials
// Returns an object
const app = initializeApp(firebaseConfig);
// Sets up my Firebase authentication instance, links auth
const auth = getAuth(app);
// sets up my Firestore (database) instance, accesses my db
const db = getFirestore(app);

export { app, auth, db };
