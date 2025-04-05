
import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "@/Layout/DashBoard/DashBoardLayout";
import DashBoardPage from "@/Pages/DashBoardPage/DashBoardPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoardLayout/>,
    children:[
      {
        index:true,
        element:<DashBoardPage/>
      }
    ]
  },
]);

export default router;