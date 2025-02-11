// FirebaseAuth.js
import { auth } from "../../firebase"; // ✅ Import auth from firebase.js
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { EmailAuthProvider, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      console.log("Sign-in success:", authResult);
      return false; // Prevents automatic redirect
    },
    signInFailure: function (error) {
      console.error("Sign-in error:", error);
    },
    uiShown: function () {
      const loader = document.getElementById("loader");
      if (loader) loader.style.display = "none";
    },
  },
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      signInMethod: EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
      requireDisplayName: false,
      disableSignUp: { status: false },
    },
    GoogleAuthProvider.PROVIDER_ID,
  ],
  signInFlow: "popup",
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};

let uiInstance = null;

const startFirebaseUI = (elementId) => {
  const element = document.querySelector(elementId);
  if (!element) {
    console.error("Firebase UI container not found!");
    return;
  }

  try {
    if (!uiInstance) {
      uiInstance = firebaseui.auth.AuthUI.getInstance();
      if (!uiInstance) {
        uiInstance = new firebaseui.auth.AuthUI(auth);
      }
    }
    uiInstance.reset();
    uiInstance.start(elementId, uiConfig);
  } catch (error) {
    console.error("Error starting Firebase UI:", error);
  }
};

const cleanupFirebaseUI = () => {
  try {
    if (uiInstance) {
      uiInstance.reset();
    }
  } catch (error) {
    console.error("Error cleaning up Firebase UI:", error);
  }
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    if (uiInstance) {
      uiInstance.reset();
    }
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);
  } else {
    console.log("User is signed out");
  }
});

export { startFirebaseUI, cleanupFirebaseUI, handleLogout };
