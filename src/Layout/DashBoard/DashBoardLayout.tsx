import { Outlet } from "react-router-dom";
import SideBar from "@/Components/SideBar/SideBar";
function DashBoardLayout() {
  return (
    <>
      <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
        <div className="w-[100px] hidden md:block bg-indigo-50 fixed top-0 left-0 h-full ">
          <SideBar isMobile = {false}/>
        </div>
        <div className="flex-1 md:ml-[100px] overflow-y-auto">
          <Outlet />
        </div>
        <div className="md:hidden  fixed bottom-0 left-0 w-full bg-indigo-50 shadow-lg">
          <SideBar isMobile= {true}/>
        </div>
      </div>
    </>
  );
}

export default DashBoardLayout;
