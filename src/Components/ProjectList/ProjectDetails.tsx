import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  ProjectListItem,
  ProjectListDataType,
} from "@/CONSTANTS/ProjectListItems";
import { Star } from "lucide-react";

export default function ProjectDetails() {
  const { slack } = useParams<{ slack: string }>();
  const project = ProjectListItem.find(
    (p: ProjectListDataType) => p.slack === slack
  );

  // state for toggling the star icon
  const [isStarred, setIsSStarred] = useState(false);

  // function for handling the starToggle
  function handleStarToggle() {
    setIsSStarred((prev) => !prev);
  }

  return (
    <>
      <div className="h-full w-full px-6">
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between">
          {/* Project Name,type and others section */}
          <div className="flex flex-col gap-2">
            {/* Project name  */}
            <div className="text-2xl font-semibold text-slate-900">
              {project?.name}
            </div>
            <div className="text-sm tracking-wider">
              {project?.techStack}/{project?.WorkType}
            </div>
          </div>
          {/* Star options */}

          <div className="items-center justify-center">
            <button onClick={handleStarToggle} className="cursor-pointer">
              <Star 
              size={24}
              className={isStarred?"fill-indigo-400 text-indigo-400 ":"text-slate-900"}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
