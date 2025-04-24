import { useState } from "react";
import SearchBarProjectList from "./SearchBarProjectList";
import {
  ProjectListItem,
  ProjectListDataType,
} from "@/CONSTANTS/ProjectListItems";
import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
function ProjectListLayout() {
  // State to store the selected category
  const [selectedCategory, setSelectedcategory] = useState("Active");

  // State for the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Group the projects by category
  const groupedProjects: { [key: string]: ProjectListDataType[] } = {
    Active: ProjectListItem.filter((project) => {
      return project.category === "Active";
    }),

    OnHold: ProjectListItem.filter((project) => {
      return project.category === "On Hold";
    }),

    Closed: ProjectListItem.filter((project) => {
      return project.category === "Closed";
    }),
  };

  // get the projects accroding to the category
  const categoryProjects = groupedProjects[selectedCategory] || [];

  // Filter projects based on search query
  const displayedProjects = categoryProjects.filter((project)=>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Function for the searching
  const handleSearch = (query:string) =>
  {
    setSearchQuery(query);
  }

  return (
    <>
      
      <div className="h-full px-6 ">
        {/* Project List Header */}
        <div className="text-2xl font-bold ">All Projects</div>

        {/* Search Bar */}
        <div className="bg-indigo-100 h-10 w-full mt-8 rounded-4xl flex flex-row items-center gap-4">
          <SearchBarProjectList onSearch = {handleSearch} />
        </div>

        {/* Category Tabs */}
        <div className="mt-6 flex space-x-4">
          {Object.keys(groupedProjects).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedcategory(category)}
              className={`px-3 py-2 rounded-4xl text-sm font-base cursor-pointer
              ${
                selectedCategory === category
                  ? "bg-slate-950 text-white"
                  : "bg-inherit text-inherit"
              }
              `}
            >
              {`${category.toUpperCase()} (${
                groupedProjects[category].length
              })`}
            </button>
          ))}
        </div>

        {/* List of Projects accroding to category */}
        <div className="mt-8">
          {displayedProjects.length === 0 ? (
            <div>
              <p className="text-gray-600">
                There are no projects.
              </p>
              <p className="text-gray-600">Create one to get started!</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {displayedProjects.map((project) => (
                <li key={project.id}>
                  <NavLink
                    to={`/dashboard/project/${project.slack}`}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-2 px-8 rounded-4xl ${
                        isActive
                          ? "bg-pink-100  font-medium"
                          : "text-slate-950 hover:bg-gray-200"
                      }`
                    }
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-semibold text-lg">
                        {project.name}
                      </span>
                      <div className="flex flex-row gap-2 items-center">
                        <span className="font-light text-sm text-slate-800">
                          {project.techStack}
                        </span>
                        <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
                        <span className="font-light text-sm text-slate-800">
                          {project.WorkType}
                        </span>
                      </div>
                    </div>
                    {/* Arrow Icon */}
                    <div className="flex items-center">
                      <ChevronRight/>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectListLayout;
