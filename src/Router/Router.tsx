import StatsPage from "@/Pages/StatsPage/StatsPage";
import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "@/Layout/DashBoard/DashBoardLayout";
import ProjectPage from "@/Pages/ProjectPage/ProjectPage"; 
import DashBoardPage from "@/Pages/DashBoardPage/DashBoardPage";
import CalendarPage from "@/Pages/CalendarPage/CalendarPage";
import MessagePage from "@/Pages/MessagePage/MessagePage";
import NotificationPage from "@/Pages/NotificationPage/NotificationPage";
import ProjectDetails from "@/Components/ProjectList/ProjectDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoardLayout/>,
    children:[
      {
        index:true,
        element:<DashBoardPage/>
      },
      {
        path:"/project",
        element:<ProjectPage/>,
        children:[
          {
            path:":slack",
            element:<ProjectDetails/>

          }
        ]
      },
      {
        path:"/calendar",
        element:<CalendarPage/>
      },
      {
        path:"/stats",
        element:<StatsPage/>
      },
      {
        path:"/chats",
        element:<MessagePage/>
      },
      {
        path:"/notification",
        element:<NotificationPage/>

      }
    ]
  },
]);

export default router;