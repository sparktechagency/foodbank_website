import { Outlet } from "react-router-dom";

import SidBar from "../../components/LayoutComponents/SidBar";
import Header from "../../components/LayoutComponents/Header";

const DashboardLayout = () => {
  
  return (
    <div className="lg:flex h-screen">
    
      <div className="lg:w-50 lg:fixed lg:top-0 lg:left-0 lg:bottom-0 hidden lg:block">
        <SidBar />
      </div>

     
      <div className="lg:flex-1 lg:ml-48">
      <div className="lg:hidden">
      <Header />
      </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
