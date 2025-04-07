import ProjectDetailsHeader from "./ProjectDetailsHeader";
import ProjectDetailsBody from "./ProjectDetailsBody";
export default function ProjectDetailsLayout()
{
  return(
    <>
      <div className="h-full w-full px-6">
        <ProjectDetailsHeader/>
        <div className="mt-10">
          <ProjectDetailsBody/>
        </div>
      </div>
    </>
  );
} 