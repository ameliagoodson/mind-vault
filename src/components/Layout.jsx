import Footer from "./Footer";
import Navbar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div className="layout h-screen flex flex-col">
      <Navbar />
      <main className="overflow-auto flex p-4 flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
