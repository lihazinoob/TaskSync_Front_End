import ProjectListLayout from "@/Components/ProjectList/ProjectListLayout";
import { Outlet } from "react-router-dom";

export default function ProjectPage() {
  return (
    <>
      <div className="flex mt-6 gap-2  ">
        <div className="h-full">
          <ProjectListLayout />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
