import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";






import ForgetPass from "../Auth/ForgetPass";
import Verify from "../Auth/Verify";
import ResetPass from "../Auth/ResetPass";

import Login from "../Auth/Login";
import Events from "../components/Events/Events";
import Clients from "../page/Clients/Clients";
import Volunteers from "../page/Volunteers/Volunteers";
import Reports from "../page/Reports/Reports";



export const router = createBrowserRouter([
  {
    path: "/",
    element: (
     
        <DashboardLayout></DashboardLayout>
      
    ),
    children: [
      {
        path: "/",
        element: <Events></Events>
      },
      {
        path: "/dashboard/clients",
        element: <Clients></Clients>
      },
      {
        path: "/dashboard/volunteers",
        element: <Volunteers></Volunteers>
      },
      
      {
        path: "/dashboard/reports",
        element: <Reports></Reports>
      },
     
      
      
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forgetpassword",
    element: <ForgetPass></ForgetPass>,
  },
  {
    path: "/verify",
    element: <Verify></Verify>,
  },
  {
    path: "/reset",
    element: <ResetPass></ResetPass>,
  },
]);
