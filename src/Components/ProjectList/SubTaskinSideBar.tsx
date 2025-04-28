// SubTaskinSideBar.tsx
import { Subtask } from "@/CONSTANTS/ProjectListItems";
import { BadgePlus } from "lucide-react";
import { useState } from "react";
import AddSubTaskModal from "./AddSubTaskModal";

interface SubTaskinSideBarProps {
  taskId: string;
  subtasks: Subtask[];
  onAddSubTask: (taskId: string, newSubTask: Subtask) => Promise<void>;
  onToggleSubtask: (taskId: string, subtaskId: string, completed: boolean) => Promise<void>;
}

export default function SubTaskinSideBar({
  taskId,
  subtasks,
  onAddSubTask,
  onToggleSubtask,
}: SubTaskinSideBarProps) {
  const [isAddSubTaskModalOpen, setIsAddSubTaskModalOpen] = useState(false);
  const [localSubtasks, setLocalSubtasks] = useState<Subtask[]>(subtasks);

  const handleToggle = async (subtaskId: string, completed: boolean) => {
    const subtask = localSubtasks.find((s) => s.id === subtaskId);
    if (!subtask) return;

    const previousCompleted = subtask.completed;
    setLocalSubtasks((prev) =>
      prev.map((s) => (s.id === subtaskId ? { ...s, completed } : s))
    );

    try {
      await onToggleSubtask(taskId, subtaskId, completed);
    } catch (error) {
      console.error("Failed to toggle subtask:", error);
      setLocalSubtasks((prev) =>
        prev.map((s) =>
          s.id === subtaskId ? { ...s, completed: previousCompleted } : s
        )
      );
    }
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">Subtasks</h3>
        <button
          onClick={() => setIsAddSubTaskModalOpen(true)}
          className="text-indigo-500 hover:text-indigo-700"
        >
          <BadgePlus size={20} />
        </button>
      </div>
      {subtasks.length === 0 ? (
        <p className="text-sm text-gray-500">No subtasks yet.</p>
      ) : (
        <ul className="space-y-2">
          {subtasks.map((subtask) => (
            <li
              key={subtask.id}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleToggle(subtask.id, !subtask.completed)}
            >
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => handleToggle(subtask.id, !subtask.completed)}
                className="h-4 w-4 text-indigo-600"
              />
              <span
                className={`text-sm ${
                  subtask.completed ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {subtask.title}
              </span>
            </li>
          ))}
        </ul>
      )}
      {isAddSubTaskModalOpen && (
        <AddSubTaskModal
          onClose={() => setIsAddSubTaskModalOpen(false)}
          onAddSubtask={async (newSubTask) => {
            console.log("SubTaskinSideBar: Adding subtask for taskId:", taskId, newSubTask);
            await onAddSubTask(taskId, newSubTask);
            setIsAddSubTaskModalOpen(false);
          }}
        />
      )}
    </div>
  );
}