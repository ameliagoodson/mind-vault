// LogoutButton.jsx
import React from 'react';
import { handleLogout } from './FirebaseAuth';

const LogoutButton = () => {
  const onLogoutClick = async () => {
    try {
      await handleLogout();
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally handle error UI feedback here
    }
  };

  return (
    <button
      onClick={onLogoutClick}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      Logout
    </button>
  );
};

export default LogoutButton;