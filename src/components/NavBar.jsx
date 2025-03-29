import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../pages/Login/LogoutButton";
import logo from "../assets/images/MindVault_logo.svg";
import { MdMenu, MdClose } from "react-icons/md";
import { useState } from "react";
import useToggle from "../hooks/useToggle";

const NavBar = () => {
  const { user } = useAuth(); // Get logged-in user
  const [showMobileMenu, toggleMobileMenu] = useToggle();
  return (
    <div>
      <header className="hidden w-full justify-around bg-white px-8 py-2 text-center sm:flex">
        <div className="header-inner container mx-auto flex max-w-7xl items-center">
          <div className="nav-left container mx-auto flex items-center">
            <img
              src={logo}
              alt="MindVault logo"
              className="mr-2 block h-6 w-6"
            />
            <nav className="flex h-12 items-center justify-center bg-white bg-auto py-4 text-center text-sm sm:flex">
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
                    <Link to="/flashcards" className="mr-4">
                      Flashcards
                    </Link>
                    <Link to="/flashcards/create" className="mr-4">
                      Create Flashcard
                    </Link>
                    <Link to="/study" className="mr-4">
                      Study
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link to="/login">Login</Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
          <div className="nav-right">
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* MOBILE */}
      <header className="flex bg-white px-4 py-2 text-center sm:hidden">
        <img src={logo} alt="" className="block h-6 w-6" />
        <div className="menu-mobile w-full sm:hidden">
          <div className="menu-btn-container flex justify-end">
            <MdMenu className="h-6 w-6" onClick={() => toggleMobileMenu()} />
          </div>
          {showMobileMenu && (
            <>
              <div className="fixed inset-0 bg-indigo-600 opacity-50"></div>
              <aside className="absolute top-0 right-0 h-full w-1/2 bg-white">
                <div className="mobile-side-header px-4 py-2 text-right">
                  <MdClose
                    className="z-20 inline-flex h-6 w-6"
                    onClick={() => toggleMobileMenu()}></MdClose>
                </div>
                <nav className="top-[3rem] right-0 z-10 flex h-full flex-col bg-white bg-auto p-4 py-4 text-right text-sm">
                  <div className="container mx-auto flex max-w-5xl flex-col space-y-4">
                    <Link to="/" className="mr-4 mb-4 text-lg font-medium">
                      Home
                    </Link>
                    {user ? (
                      <div className="items-right flex h-full flex-col space-y-4">
                        <Link
                          to="/dashboard"
                          className="mr-4 text-lg font-medium">
                          Dashboard
                        </Link>
                        <Link to="/study" className="mr-4">
                          Study
                        </Link>
                        <Link
                          to="/flashcards"
                          className="mr-4 text-lg font-medium">
                          Flashcards
                        </Link>
                        <Link
                          to="/flashcards/create"
                          className="mr-4 text-lg font-medium">
                          Create Flashcard
                        </Link>
                        {/* <LogoutButton /> */}
                      </div>
                    ) : (
                      <div>
                        {user ? (
                          <LogoutButton />
                        ) : (
                          <Link to="/login">Login</Link>
                        )}
                      </div>
                    )}
                  </div>
                </nav>
              </aside>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavBar;
