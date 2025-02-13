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

// ✅ Initialize Firebase app (only once)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialise Firestore database

export { app, auth, db };
