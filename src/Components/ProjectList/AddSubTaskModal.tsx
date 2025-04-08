// src/Components/ProjectDetails/AddSubtaskModal.tsx
import { Subtask } from "@/CONSTANTS/ProjectListItems";
import { X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

interface AddSubtaskModalProps {
  onClose: () => void;
  onAddSubtask: (newSubtask: Subtask) => void;
}

export default function AddSubtaskModal({ onClose, onAddSubtask }: AddSubtaskModalProps) {
  // State to manage form inputs
  const [name, setName] = useState("");
  const [assignees, setAssignees] = useState<string[]>([]);
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  // Temporary state for assignee input
  const [assigneeInput, setAssigneeInput] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return; // Basic validation: ensure name is not empty

    const newSubtask: Subtask = {
      id: Date.now().toString(), // Generate a unique ID (temporary, replace with a better method in a real app)
      title: name,
      completed: false, // New subtasks start as uncompleted
    };

    onAddSubtask(newSubtask);
    onClose(); // Close the modal after adding
  };

  // Handle adding an assignee
  const handleAddAssignee = () => {
    if (assigneeInput.trim()) {
      setAssignees((prev) => [...prev, assigneeInput.trim()]);
      setAssigneeInput(""); // Clear the input after adding
    }
  };

  // The modal content to be rendered into the portal
  const modalContent = (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />

      {/* Modal Card */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-96 z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Add New Subtask</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subtask Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter subtask name"
              required
            />
          </div>

          {/* Assignees */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Assignees</label>
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
            {assignees.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {assignees.map((assignee, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
                  >
                    {assignee}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter description"
              rows={3}
            />
          </div>

          {/* Buttons */}
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
    </>
  );

  // Render the modal content into the body using a portal
  return createPortal(modalContent, document.body);
}