import { Task, Subtask } from "@/CONSTANTS/ProjectListItems";
import { CheckSquare, Square,BadgePlus } from "lucide-react";
import { useEffect, useState } from "react";
import AddSubTaskModal from "./AddSubTaskModal";
interface SubTaskinSideBarProps {
  task: Task;
}

export default function SubTaskinSideBar({ task }: SubTaskinSideBarProps) {
  // State to track which Subtasks are completed and which are not
  const [completedSubTask, setCompletedSubTask] = useState<Subtask[]>([]);

  // State to track if the modal for the Sub task add is oprn or not
  const[isModalOpen,setIsModalOpen] = useState<boolean>(false);

  // useEffect hook to initialize completes subtask state when completed
  useEffect(() => {
    if (
      completedSubTask.length === 0 ||
      !completedSubTask.every(
        (subtask, index) => subtask.id === task.subtasks[index]?.id
      )
    ) {
      setCompletedSubTask(task.subtasks);
    }
  }, [task]);

  // Handler function to handle the subtask toggle activity
  function toggleSubTaskCompletion(subTaskId: string) {
    setCompletedSubTask((prevCompletedTask) =>
      prevCompletedTask.map((subtask) =>
        subtask.id === subTaskId
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      )
    );
  }

  function handleAddSubTask(newSubTask:Subtask)
  {
    setCompletedSubTask((prev)=>[...prev,newSubTask]);
  }

  if (completedSubTask.length === 0) {
    return (
      <>
        <h3 className="text-sm font-medium text-gray-700">Sub-Tasks:</h3>
        <div className="text-sm font-medium text-gray-600">
          There is no subtask
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-slate-900">Sub-Tasks:</h3>
        <BadgePlus 
        size={22} 
        className="text-emerald-700 cursor-pointer"
        onClick={()=>setIsModalOpen(true)}
        />
      </div>

      <ul className="mt-4 space-y-2">
        {completedSubTask.map((subtask) => (
          <li
            key={subtask.id}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleSubTaskCompletion(subtask.id)}
          >
            {subtask.completed ? (
              <CheckSquare size={16} className="text-pink-500" />
            ) : (
              <Square size={16} className="text-gray-400" />
            )}
            <span
              className={`text-sm ${
                subtask.completed
                  ? "text-gray-500 line-through"
                  : "text-gray-600"
              }`}
            >
              {subtask.title}
            </span>
          </li>
        ))}
      </ul>
      {/* the add subtask modal */}
      {isModalOpen && (
        <AddSubTaskModal onClose={()=>setIsModalOpen(false)}
          onAddSubtask={handleAddSubTask}
        />
      )}

    </>
  );
}
