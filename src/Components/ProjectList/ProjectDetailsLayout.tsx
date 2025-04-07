import ProjectDetailsHeader from "./ProjectDetailsHeader";
import ProjectDetailsBody from "./ProjectDetailsBody";
export default function ProjectDetailsLayout() {
  return (
    <>
      <div className="h-full w-full flex flex-col">
        <div className="px-6">
          <ProjectDetailsHeader />
        </div>

        <div className="mt-10 flex-1 pr-6">
          <ProjectDetailsBody /> 
        </div>
      </div>
    </>
  );
}
