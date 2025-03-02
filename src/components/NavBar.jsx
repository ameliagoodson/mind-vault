import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../pages/Login/LogoutButton";
import logo from "../assets/images/logo-mindvault.jpg";

const NavBar = () => {
  const { user } = useAuth(); // Get logged-in user

  return (
    <header className="flex bg-white text-center">
      <img src={logo} alt="" className="block h-6 w-6" />
      <nav className="flex h-12 w-full justify-center bg-white bg-auto py-4 text-center text-sm">
        <div className="container mx-auto flex max-w-5xl justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              Home
            </Link>
          </div>
          {user ? (
            <div className="flex items-center justify-end">
              <Link to="/dashboard" className="mr-4">
                Dashboard
              </Link>
              {/* <Link to="/study" className="mr-4">
                Study
              </Link> */}
              <Link to="/flashcards" className="mr-4">
                Flashcards
              </Link>
              <Link to="/flashcards/create" className="mr-4">
                Create Flashcard
              </Link>
              {/* <LogoutButton /> */}
            </div>
          ) : (
            <div>
              {user ? <LogoutButton /> : <Link to="/login">Login</Link>}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
