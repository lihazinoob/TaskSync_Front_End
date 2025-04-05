import { LayoutDashboard,FolderOpen,Calendar,ChartNoAxesColumn,MessageSquare,Bell } from "lucide-react";
import {LucideIcon} from "lucide-react"
interface SidebarLinkDataType{
  label:string,
  path:string,
  icon:LucideIcon
}
export const SideBarLinks:SidebarLinkDataType[] = [
  {
    label:"Dashboard",
    icon:LayoutDashboard,
    path:"/"
  },
  {
    label:"Project",
    icon:FolderOpen,
    path:"/projects"
  },
  {
    label:"Calender",
    icon:Calendar,
    path:"/calender"
  },
  {
    label:"Stats",
    icon:ChartNoAxesColumn,
    path:"/stats"
  },
  {
    label:"Message",
    icon:MessageSquare,
    path:"/chats"
  },
  {
    label:"Notification",
    icon:Bell,
    path:"/notification"
  },
];