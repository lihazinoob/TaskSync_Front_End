import { useParams } from "react-router-dom";
import {
  Subtask,
  Task,
} from "@/CONSTANTS/ProjectListItems";
import { MessageCircle, Paperclip, Plus, UserCircle } from "lucide-react";
import { useState } from "react";
import TaskDetailsSideBar from "./TaskDetailsSideBar";
import CreateTaskModal from "./CreateTaskModal";
import { useProjectStoreContext } from "@/Context/ProjectStoreContext";
const taskCategories = ["Todo", "In Progress", "Completed"] as const;
type TaskCategory = (typeof taskCategories)[number];

export default function ProjectDetailsBody() {
  // Finding the slack from the URL of browser
  const { slack } = useParams<{ slack: string }>();

  // Using the context to get the projects
  const { projects, addSubTask, toggleSubTaskCompletionStatus } =
    useProjectStoreContext();

  // State for tracking which task has been clicked
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // State to track if the Modal to create a Task is open or not
  const [isCreateTaskModalOpen, setIsCreateProjectModalOpen] =
    useState<boolean>(false);

  const project = projects.find((p) => p.slack === slack);

  // function to habdle subtask addition which is passed to the SubTaskInSideBar
  async function handleAddSubTask(taskId: string, newSubTask: Subtask) {
    if (!slack) {
      console.error("Slack Parametr is undefined");
      return;
    }
    try {
      await addSubTask(slack, taskId, newSubTask);
      // Update the selected task
      if (selectedTask && selectedTask.id === taskId) {
        const updatedProject = projects.find((p)=>p.slack === slack);

        const updatedTask = updatedProject?.tasks.find(
          (task) => task.id === taskId
        );
        if (updatedTask) {
          setSelectedTask(updatedTask);
        }
      }
    } catch (err) {
      console.error("Failed to add subtask", err);
    }
  }

  async function handleToggleSubtask(
    taskId: string,
    subtaskId: string,
    completed: boolean
  ) {
    if (!slack) {
      console.error("Slack parameter is undefined");
      return;
    }

    try {
      await toggleSubTaskCompletionStatus(slack, taskId, subtaskId, completed);
  
      if (selectedTask && selectedTask.id === taskId) {
        const updatedProject = projects.find((p) => p.slack === slack);
        const updatedTask = updatedProject?.tasks.find(
          (task) => task.id === taskId
        );
        if (updatedTask) {
          setSelectedTask(updatedTask);
        }
      }
    } catch (err) {
      console.error("Failed to toggle subtask", err);
    }
  }

  if (!project) {
    return (
      <div className="bg-indigo-100 p-2 rounded-lg">
        <div className="text-xl px-4 font-semibold tracking-widest">TASKS</div>
        <div className="mt-8 px-2 text-gray-600">Project not found.</div>
      </div>
    );
  }

  // Group Task By Category
  const groupedTasks: { [key in TaskCategory]: Task[] } = {
    Todo: project.tasks.filter((task) => {
      return task.category === "Todo";
    }),
    "In Progress": project.tasks.filter(
      (task) => task.category === "In Progress"
    ),
    Completed: project.tasks.filter((task) => task.category === "Completed"),
  };

  return (
    <>
      <div className="bg-indigo-100 p-2 rounded-lg">
        {/* Header section */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-xl px-4 font-semibold tracking-widest">
            TASKS
          </div>
          <button
            className="mr-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 cursor-pointer"
            onClick={() => setIsCreateProjectModalOpen(true)}
          >
            <Plus size={20} />
          </button>
        </div>

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
                <h3 className="text-sm font-semibold tracking-wider text-slate-950">
                  {category.toUpperCase()}({groupedTasks[category].length})
                </h3>
              </div>
              {/* Task Cards */}
              {groupedTasks[category].length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No Tasks in this category
                </p>
              ) : (
                groupedTasks[category].map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-4 mb-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer"
                    onClick={() => setSelectedTask(task)}
                  >
                    {/* Task Type */}
                    <span className="text-xs font-medium text-gray-500">
                      {project.workType.toUpperCase()}
                    </span>
                    {/* Task Title */}
                    <h4 className="text-sm font-semibold text-gray-800 mt-1">
                      {task.title}
                    </h4>
                    {/* Task Description (mocked) */}
                    <p className="text-xs text-gray-600 mt-1">
                      {task.category === "Completed"
                        ? `Completed task for ${project.name}`
                        : `Work on ${task.title.toLowerCase()} for ${
                            project.name
                          }`}
                    </p>

                    {/* Task Metadata */}
                    <div className="flex items-center gap-3 mt-3 text-gray-500 text-xs">
                      <div className="flex items-center gap-1">
                        <MessageCircle />
                        <span>12</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Paperclip />
                        <span>4</span>
                      </div>
                      <div className="flex items-center gap-1 ml-auto">
                        <span>Assigned to</span>
                        <div className="flex -space-x-2">
                          <UserCircle className="w-6 h-6 text-gray-400" />
                          <UserCircle className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Task Details Sidebar */}
      {selectedTask && (
        <>
          <div
            className="fixed inset-0 bg-black/30  z-40"
            onClick={() => setSelectedTask(null)}
          >
            {/* Sidebar menu item*/}
          </div>
          <TaskDetailsSideBar
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onAddSubTask={handleAddSubTask}
            onToggleSubtask={handleToggleSubtask}
          />
        </>
      )}

      {/* Task Modal Open Close */}
      {isCreateTaskModalOpen && (
        <CreateTaskModal
          projectSlack={slack as string}
          onClose={() => setIsCreateProjectModalOpen(false)}
        />
      )}
    </>
  );
}
