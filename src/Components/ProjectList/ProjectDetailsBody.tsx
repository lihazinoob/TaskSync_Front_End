import { useParams } from "react-router-dom";
import {
  Subtask,
  ProjectListDataType,
  Task,
  fetchProjectBySlack,
  addSubtaskToTask,
  updateSubTaskCompletionStatus,
  useProjectStore
} from "@/CONSTANTS/ProjectListItems";
import { MessageCircle, Paperclip, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import TaskDetailsSideBar from "./TaskDetailsSideBar";
const taskCategories = ["Todo", "In Progress", "Completed"] as const;
type TaskCategory = (typeof taskCategories)[number];

export default function ProjectDetailsBody() {
  // State for tracking which task has been clicked
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  // State or Local data to track which project is opened
  const[project,setProject] = useState<ProjectListDataType|undefined>(undefined);

  const { slack } = useParams<{ slack: string }>();
  
  // when the component mounts or the slack changes the function fetchProjectBySlack is called
  useEffect(()=>{
    if(slack)
    {
      setProject(fetchProjectBySlack(slack));
    }
  },[slack]);

  // function to habdle subtask addition which is passed to the SubTaskInSideBar
  async function handleAddSubTask(taskId:string,newSubTask:Subtask)
  {
    if(!slack)
    {
      console.error("Slack Parametr is undefined");
      return;
    }
    try{
      await addSubtaskToTask(slack, taskId,newSubTask);
      // refetch the project to update the UI
      const updatedProject = fetchProjectBySlack(slack);
      setProject(updatedProject);

      // Update the selected task 
      if(selectedTask && selectedTask.id === taskId)
      {
        const updatedTask = updatedProject?.tasks.find((task)=> task.id === taskId);
        if(updatedTask)
        {
          setSelectedTask(updatedTask);
        }
      }

    }
    catch(err)
    {
      console.error("Failed to add subtask",err);
    }
  }

  async function handleToggleSubtask(taskId: string, subtaskId: string, completed: boolean) {
    if (!slack) {
      console.error("Slack parameter is undefined");
      return;
    }

    try {
      await updateSubTaskCompletionStatus(slack, taskId, subtaskId, completed);
      const updatedProject = fetchProjectBySlack(slack);
      setProject(updatedProject);

      if (selectedTask && selectedTask.id === taskId) {
        const updatedTask = updatedProject?.tasks.find((task) => task.id === taskId);
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
            onToggleSubtask = {handleToggleSubtask}
          />
        </>
      )}
    </>
  );
}
