import { Task } from "@/CONSTANTS/ProjectListItems"
import { X } from "lucide-react"
interface TaskDetailsSideBarProps{
  task:Task|null,
  onClose:()=>void
}

export default function TaskDetailsSideBar({task,onClose}:TaskDetailsSideBarProps)
{
  if(!task)
  {
    return null;
  }


  return(
    <>
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-6 overflow-y-auto z-50 transition-transform transform translate-x-0">
        {/* Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-semibold text-slate-900">
            {task.title}
          </h2>
          <button onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X/>
          </button>
        </div>
      </div>
    </>
  )

}