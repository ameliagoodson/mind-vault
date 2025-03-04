import Footer from "./Footer";
import Navbar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div className="layout flex h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 overflow-auto p-4">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
