import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  ProjectListItem,
  ProjectListDataType,
} from "@/CONSTANTS/ProjectListItems";
import { Star,Plus } from "lucide-react";

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

  // Mock data for avatars (replace with actual project data later)
  const avatars = [
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
  ];
  const additionalPeople = 11; // Number of additional people

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

          {/* Stars and Avatar section */}
          <div className="flex justify-center gap-4">
            {/* Star Opttion */}
            <button onClick={handleStarToggle} className="cursor-pointer">
              <Star
                size={24}
                className={
                  isStarred
                    ? "fill-indigo-400 text-indigo-400 "
                    : "text-slate-900"
                }
              />
            </button>

            {/* Avatar Layout */}
            <div className="items-center flex border-2  p-1 rounded-full">
              {/* Overlapping Avatars */}
              <div className="flex -space-x-3">
                {avatars.map((avatar, index) => (
                  <img
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white text-xs font-medium text-gray-700">
                  +{additionalPeople}
                </div>
              </div>
              {/* Add People Button */}
              <button className="ml-2 w-8 h-8 rounded-full border-2 border-dashed border-blue-500 flex items-center justify-center cursor-pointer">
                <Plus size={16} className="text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
