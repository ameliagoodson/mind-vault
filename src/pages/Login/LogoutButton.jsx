// LogoutButton.jsx
import { handleLogout } from "./FirebaseAuth";
import Button from "../../components/Button";

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
    <Button
      onClick={onLogoutClick}
      cssClasses="btn btn-primary"
      btntext="Logout"></Button>
  );
};

export default LogoutButton;
