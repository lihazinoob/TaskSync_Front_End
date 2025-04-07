import { useParams } from "react-router-dom";
import {
  ProjectListItem,
  ProjectListDataType,
} from "@/CONSTANTS/ProjectListItems";

const taskCategories = ["Todo", "In Progress", "Completed"];

export default function ProjectDetailsBody() {
  const { slack } = useParams<{ slack: string }>();
  const project = ProjectListItem.find(
    (p: ProjectListDataType) => p.slack === slack
  );

  return (
    <>
      <div className="bg-indigo-100 p-2 rounded-lg">
        {/* Header section */}
        <div className="text-xl px-4 font-semibold tracking-widest">TASKS</div>

        {/* Different Tasks of different category */}
        <div className="mt-8 px-2 flex space-x-4">
          {taskCategories.map((category) => (
            <div key={category} className="flex-1 min-w-[250px]">
              {/* Column Header */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`w-2 h-2 rounded-full ${
                    category === "Todo"
                      ? "bg-purple-500"
                      : category === "In Progress"
                      ? "bg-blue-500"
                      : category === "Completed"
                      ? "bg-green-500"
                      : ""
                  }`}
                ></div>
                <h3 className="text-sm font-semibold tracking-wider">
                  {category.toUpperCase()}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
