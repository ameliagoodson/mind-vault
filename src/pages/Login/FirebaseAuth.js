// FirebaseAuth.js
// Sets up how users sign in
// Creates and manages Firebase UI login screen
// Handles authentication state changes (checks if user is logged in)
// Provides a function to log the user out

import { auth } from "../../firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Sets up Google & Email/Password login via Firebase UI.
// The uiConfig object is a configuration object that Firebase UI expects. It contains settings for how the authentication UI behaves.
const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      console.log("Sign-in success:", authResult);
      return false; // Prevents automatic redirect after login
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

// startFirebaseUI is called in LoginUI
const startFirebaseUI = (elementId) => {
  const element = document.querySelector(elementId);
  if (!element) {
    console.error("Firebase UI container not found!");
    return;
  }

  // check whether a uiInstance already exists. If not, create one.
  try {
    if (!uiInstance) {
      uiInstance = firebaseui.auth.AuthUI.getInstance();
      if (!uiInstance) {
        uiInstance = new firebaseui.auth.AuthUI(auth);
      }
    }
    // tells Firebase UI reset and  mount itself inside the given HTML container (elementId) using our uiConfig settings.
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

// Listens for changes in auth e.g. whether user is logged in or out
// Used in auth context
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);
  } else {
    console.log("User is signed out");
  }
});

export { startFirebaseUI, cleanupFirebaseUI, handleLogout };
