import Footer from "./Footer";
import Navbar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 p-4 flex flex-col h-full" >{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
