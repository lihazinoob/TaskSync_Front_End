import StatsPage from "@/Pages/StatsPage/StatsPage";
import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "@/Layout/DashBoard/DashBoardLayout";
import ProjectPage from "@/Pages/ProjectPage/ProjectPage";
import DashBoardPage from "@/Pages/DashBoardPage/DashBoardPage";
import CalendarPage from "@/Pages/CalendarPage/CalendarPage";
import MessagePage from "@/Pages/MessagePage/MessagePage";
import NotificationPage from "@/Pages/NotificationPage/NotificationPage";
import ProjectDetailsLayout from "@/Components/ProjectList/ProjectDetailsLayout";
import AuthWrapper from "@/Components/Auth/AuthWrapper";
import AuthCallBack from "@/Components/Auth/AuthCallBack";
import DefaultLayout from "@/Layout/DefaultLayout/DefaultLayout";
import ProtectedRoute from "@/Layout/ProtectedLayout/ProtectedLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <AuthWrapper />,
      },
      {
        path: "/auth/callback",
        element: <AuthCallBack />,
      },
      // // This path or route is for SignUp layout
      {
        path: "/register",
        element: <AuthWrapper />,
      },
    ],
  },

  // This path or route is for dashboard layout
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {  
        element: <DashBoardLayout />,
        children:[
          {
            index:true,
            element:<DashBoardPage/>
          },
          {
            path: "project",
            element: <ProjectPage />,
            children: [
              {
                path: ":slack",
                element: <ProjectDetailsLayout />,
              },
            ],
          },
        ]
      },

      
      // {
      //   path: "/calendar",
      //   element: <CalendarPage />,
      // },
      // {
      //   path: "/stats",
      //   element: <StatsPage />,
      // },
      // {
      //   path: "/chats",
      //   element: <MessagePage />,
      // },
      // {
      //   path: "/notification",
      //   element: <NotificationPage />,
      // },
    ],
  },
]);

export default router;
