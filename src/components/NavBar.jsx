import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../pages/Login/LogoutButton";
import logo from "../assets/images/logo-mindvault.png";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

const NavBar = () => {
  const { user } = useAuth(); // Get logged-in user
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div>
      <header className="hidden bg-white px-4 py-2 text-center sm:flex">
        <img src={logo} alt="" className="block h-6 w-6" />
        <nav className="hidden h-12 w-full justify-center bg-white bg-auto py-4 text-center text-sm sm:flex">
          <div className="container mx-auto flex max-w-5xl justify-between">
            <div className="flex items-center">
              <Link to="/" className="mr-4">
                Home
              </Link>
            </div>
            <MdMenu className="md:hidden" />
            {user ? (
              <div className="nav-menu-mobile md:menu-desktop flex items-center justify-end">
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
      <header className="flex bg-white px-4 py-2 text-center sm:hidden">
        <img src={logo} alt="" className="block h-6 w-6" />
        <div className="menu-mobile w-full sm:hidden">
          <div className="menu-btn-container flex justify-end">
            <MdMenu
              className="h-6 w-6"
              onClick={() =>
                showMobileMenu
                  ? setShowMobileMenu(false)
                  : setShowMobileMenu(true)
              }
            />
          </div>
          {showMobileMenu && (
            <nav className="absolute top-[40px] right-0 z-10 flex h-full w-1/3 flex-col bg-white bg-auto p-4 py-4 text-right text-sm">
              <div className="container mx-auto flex max-w-5xl flex-col">
                <Link to="/" className="mr-4 mb-4">
                  Home
                </Link>
                {user ? (
                  <div className="items-right flex h-full flex-col gap-4">
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
          )}
        </div>
      </header>
    </div>
  );
};

export default NavBar;
