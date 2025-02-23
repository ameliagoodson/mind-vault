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
    // <Button onClick={onLogoutClick} className="btn-primary">
    //   Test
    // </Button>
    <button onClick={onLogoutClick} className="btn-primary">
      Logout
    </button>
  );
};

export default LogoutButton;
