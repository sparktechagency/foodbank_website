import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";






import ForgetPass from "../Auth/ForgetPass";
import Verify from "../Auth/Verify";
import ResetPass from "../Auth/ResetPass";

import Login from "../Auth/Login";
import Events from "../components/Events/Events";
import Clients from "../page/Clients/Clients";
import Volunteers from "../page/Volunteers/Volunteers";

import ClientDetailsPage from "../page/Clients/ClientDetailsPage";
import ClientDeliveryDetailsPage from "../page/Clients/ClientDeliveryDetailsPage";
import EventClientDetailsPage from "../components/Events/EventClientDetailsPage";
import ConfirmedVoluntrees from "../components/Events/ConfirmedVoluntrees";
import EventView from "../components/Events/EventView";
import Admin from "../page/Admin/Admin";
import Profile from "../page/Settings/Profile";
import VolunteerGroupDetails from "../page/Volunteers/VolunteerGroupDetails";



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
        path: "/event/eventDetails",
        element: <EventClientDetailsPage></EventClientDetailsPage>
      },
      {
        path: "/event/confirmedVolunteers",
        element: <ConfirmedVoluntrees></ConfirmedVoluntrees>
      },
      {
        path: "/event/eventView",
        element: <EventView></EventView>
      },
      {
        path: "/clients",
        element: <Clients></Clients>
      },
      {
        path: "/clients/ClientDeliveryDetailsPage",
        element: <ClientDeliveryDetailsPage></ClientDeliveryDetailsPage>
      },
      {
        path: "/clients/clientsDetails",
        element: <ClientDetailsPage></ClientDetailsPage>,
      },

      {
        path: "/volunteers",
        element: <Volunteers></Volunteers>
      },
      
      {
        path: "/admin",
        element: <Admin></Admin>
      },
      {
        path:"/profile",
        element:<Profile></Profile>
      },
      {
        path:"/volunteerDetails",
        element:<VolunteerGroupDetails></VolunteerGroupDetails>
      }
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
