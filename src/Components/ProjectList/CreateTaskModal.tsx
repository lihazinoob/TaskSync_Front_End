import { Task, createTask } from "@/CONSTANTS/ProjectListItems";
import { X } from "lucide-react";
import { useState } from "react";
interface CreateTaskModalProps {
  projectSlack: string;
  onClose: () => void;
}

export default function CreateTaskModal({
  projectSlack,
  onClose,
}: CreateTaskModalProps) {
  // State to track if there is any error
  const [error, setError] = useState<string | null>(null);
  // State to track the assignees
  const [assigneeInput, setAssigneeInput] = useState("");

  // State to track the data from the user
  const [formData, setFormData] = useState<Omit<Task, "id" | "subtasks">>({
    title: "",
    category: "Todo",
    description: "",
    createdBy: "",
    assignees: [],
    timeline: { start: "", end: "" },
    status: "To Do",
  });

  // Function to add Assignee to the FormData
  const handleAddAssignee = () => {
    if (assigneeInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        assignees: [...prev.assignees, assigneeInput.trim()],
      }));
      setAssigneeInput("");
    }
  };
  // Function to handle the submission of the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask(projectSlack, formData);
      setError(null);
      onClose();
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to create task");
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-96 z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Create New Task
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* For the task title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter task title"
                required
              />
            </div>

            {/* For the Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Task["category"],
                  })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* For Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter description"
                rows={5}
              />
            </div>

            {/* Created By */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Created By
              </label>
              <input
                type="text"
                value={formData.createdBy}
                onChange={(e) =>
                  setFormData({ ...formData, createdBy: e.target.value })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter creator name"
                required
              />
            </div>

            {/* Assignees */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assignees
              </label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={assigneeInput}
                  onChange={(e) => setAssigneeInput(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter assignee name"
                />
                <button
                  type="button"
                  onClick={handleAddAssignee}
                  className="p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>
              {formData.assignees.map((assignee, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
                >
                  {assignee}
                </span>
              ))}
            </div>

            {/* Start TimeLine */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Timeline Start
              </label>
              <input
                type="date"
                value={formData.timeline.start}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    timeline: { ...formData.timeline, start: e.target.value },
                  })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* End TimeLine */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Timeline End
              </label>
              <input
                type="date"
                value={formData.timeline.end}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    timeline: { ...formData.timeline, end: e.target.value },
                  })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Status Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <input
                type="text"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter status"
                required
              />
            </div>

            {/* Save and Close Button */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
