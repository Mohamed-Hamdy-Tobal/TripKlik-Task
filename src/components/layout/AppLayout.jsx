import { Outlet } from "react-router-dom";
import ScrollTop from "@/components/common/ScrollTop";
import Header from "../common/Header";
import Footer from "../common/Footer";

const AppLayout = () => {
  return (
    <main className="min-h-screen bg-background bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      <div  className="min-h-[calc(100vh-197px)]">
        <Outlet />
      </div>
      <ScrollTop />
      <Footer />
    </main>
  );
};

export default AppLayout;
