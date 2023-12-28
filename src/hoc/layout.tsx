import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import PersonalSidebar from "../pages/Personal/PersonalSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div
        className='container-layout'
        style={{
          display: "flex",
          gap: "34px",
          justifyContent: "center",
          padding: "190px 0",
        }}>
        <PersonalSidebar />
        <main>
          <Outlet />
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
