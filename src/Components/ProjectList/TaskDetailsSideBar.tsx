import { Subtask, Task } from "@/CONSTANTS/ProjectListItems";
import { X} from "lucide-react";
import SubTaskinSideBar from "./SubTaskinSideBar";
interface TaskDetailsSideBarProps {
  task: Task | null;
  onClose: () => void;
  onAddSubTask:(taskId:string,newSubtask:Subtask)=>Promise<void>;
}

export default function TaskDetailsSideBar({
  task,
  onClose,
  onAddSubTask
}: TaskDetailsSideBarProps) {
  if (!task) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-6 overflow-y-auto z-50 transition-transform transform translate-x-0">
        {/* Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-semibold text-slate-900">
            {task.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X />
          </button>
        </div>

        {/* Task Details */}

        <div className="space-y-6">
          {/* Task Category and Task Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className={`w-2 h-2 rounded-full ${
                  task.category === "Todo"
                    ? "bg-purple-500"
                    : task.category === "In Progress"
                    ? "bg-blue-500"
                    : task.category === "Completed"
                    ? "bg-green-500"
                    : ""
                }`}
              ></div>
              <span className="text-xs font-medium text-gray-500">
                {task.category.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-2">{task.description}</p>
          </div>

          {/* Created BY */}
          <div>
            <h3 className="text-sm font-medium text-gray-700">Created By</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-700">
                  {task.createdBy[0]}
                </span>
              </div>
              <span className="text-sm text-gray-600">{task.createdBy}</span>
            </div>
          </div>

          {/* Assignees */}
          <div>
            <h3 className="text-sm font-medium text-gray-700">Assigned to</h3>
            <div className="flex items-center gap-2 mt-2">
              {task.assignees.map((assignee, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <span className="text-xs font-medium text-gray-700">
                    {assignee[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* TimeLine */}
          <div>
            <h3 className="text-sm font-medium text-gray-700">Timeline</h3>
            <p className="text-sm text-gray-600 mt-2">
              {task.timeline.start} to {task.timeline.end}
            </p>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-sm font-medium text-gray-700">Status</h3>
            <p className="text-sm text-gray-600 mt-2">{task.status}</p>
          </div>

          {/* Subtasks */}
          <div>
            <SubTaskinSideBar task={task} onAddSubTask={onAddSubTask} taskId={task.id}/>
          </div>



        </div>
      </div>
    </>
  );
}
