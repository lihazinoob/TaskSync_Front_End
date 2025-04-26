
// import { X } from "lucide-react";
// import { useRef, useState } from "react";
// import { ProjectListDataType, useProjectStore } from "@/CONSTANTS/ProjectListItems";

// interface CreateProjectModalProps {
//   onClose: () => void;
// }

// export default function CreateProjectModal({ onClose }: CreateProjectModalProps) {
//   // Refs for form inputs
//   const nameRef = useRef<HTMLInputElement>(null);
//   const categoryRef = useRef<HTMLSelectElement>(null);
//   const techStackRef = useRef<HTMLInputElement>(null);
//   const workTypeRef = useRef<HTMLInputElement>(null);

//   const { addProject } = useProjectStore();

//   // State for error handling
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       console.log("handleSubmit function called");
//       const formData: Omit<ProjectListDataType, "id" | "slack" | "tasks"> = {
//         name: nameRef.current?.value || "",
//         category: (categoryRef.current?.value as "Active" | "On Hold" | "Closed") || "Active",
//         techStack: techStackRef.current?.value || "",
//         workType: workTypeRef.current?.value || "",
//       };

//       // Basic validation
//       if (!formData.name || !formData.techStack || !formData.workType) {
//         throw new Error("All fields are required");
//       }

//       await addProject(formData);
//       setError(null);
//       onClose();
//     } catch (error: any) {
//       setError(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to create a Project, please Try Again"
//       );
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/30 z-50">
//         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-96 z-50">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold text-slate-900">
//               Create New Project
//             </h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 cursor-pointer"
//             >
//               <X size={24} />
//             </button>
//           </div>
//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Project Name
//               </label>
//               <input
//                 type="text"
//                 ref={nameRef}
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter project name"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Category
//               </label>
//               <select
//                 ref={categoryRef}
//                 defaultValue="Active"
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 <option value="Active">Active</option>
//                 <option value="On Hold">On Hold</option>
//                 <option value="Closed">Closed</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Tech Stack
//               </label>
//               <input
//                 type="text"
//                 ref={techStackRef}
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter tech stack"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Work Type
//               </label>
//               <input
//                 type="text"
//                 ref={workTypeRef}
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter work type"
//                 required
//               />
//             </div>
//             <div className="flex justify-end gap-2 mt-6">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 cursor-pointer"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }





import { X } from "lucide-react";
import { useState } from "react";
import { ProjectListDataType } from "@/CONSTANTS/ProjectListItems";
import { useProjectStoreContext } from "@/Context/ProjectStoreContext"; // Import the context hook

interface CreateProjectModalProps {
  onClose: () => void;
}

export default function CreateProjectModal({ onClose }: CreateProjectModalProps) {
  const [formData, setFormData] = useState<
    Omit<ProjectListDataType, "id" | "slack" | "tasks">
  >({
    name: "",
    category: "Active",
    techStack: "",
    workType: "",
  });

  const { addProject } = useProjectStoreContext(); // Use context hook

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("handleSubmit function called");
      await addProject(formData);
      setError(null);
      onClose();
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to create a Project, please Try Again"
      );
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-96 z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Create New Project
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter project name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as "Active" | "On Hold" | "Closed",
                  })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Active">Active</option>
                <option value="On Hold">On Hold</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tech Stack
              </label>
              <input
                type="text"
                value={formData.techStack}
                onChange={(e) =>
                  setFormData({ ...formData, techStack: e.target.value })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter tech stack"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work Type
              </label>
              <input
                type="text"
                value={formData.workType}
                onChange={(e) =>
                  setFormData({ ...formData, workType: e.target.value })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter work type"
                required
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 cursor-pointer"
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