import ProjectListLayout from "@/Components/ProjectList/ProjectListLayout";
import { ProjectStoreProvider } from "@/Context/ProjectStoreContext";
import { Outlet } from "react-router-dom";

export default function ProjectPage() {
  return (
    <>
      <ProjectStoreProvider>
        <div className="flex mt-6 gap-2">
          <div className="h-full">
            <ProjectListLayout />
          </div>
          <div className="h-full flex-1">
            <Outlet />
          </div>
        </div>
      </ProjectStoreProvider>
    </>
  );
}
