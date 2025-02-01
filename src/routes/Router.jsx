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
import { Success } from "../page/sucess/Success";
import VolunteerDetailsPage from "../page/Volunteers/VolunteerDetailsPage";
import DriverDetailsPage from "../page/Volunteers/DriverDetailsPage";
import { PendingDetails } from "../components/Events/PendingDetails";
import { ConfirmedWarehouse } from "../components/Events/ConfirmedWarehouse";
import { PendingWarehouse } from "../components/Events/PendingWarehouse";
import { Cancel } from "../page/sucess/Cancel";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";



export const router = createBrowserRouter([
  {
    path: "/",
    element: (
     
        <ProtectedRoute>
          <DashboardLayout></DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Events></Events>
      },
      {
        path: "/event/eventDetails/:id",
        element: <EventClientDetailsPage></EventClientDetailsPage>
      },
      {
        path: "/event/confirmedVolunteers/:id",
        element: <ConfirmedVoluntrees></ConfirmedVoluntrees>
      },
      {
        path: "/event/confirmedWarehouse/:id",
        element: <ConfirmedWarehouse></ConfirmedWarehouse>
      },
      {
        path: "/event/pending-Driver/:id",
        element: <PendingDetails></PendingDetails>
      },
      {
        path: "/event/pending-Warehouse/:id",
        element: <PendingWarehouse></PendingWarehouse>
      },
      {
        path: "/event/eventView/:id",
        element: <EventView></EventView>
      },
      {
        path: "/clients",
        element: <Clients></Clients>
      },
      {
        path: "/clients/ClientDeliveryDetailsPage/:id",
        element: <ClientDeliveryDetailsPage></ClientDeliveryDetailsPage>
      },
      {
        path: "/clients/clientsDetails/:id",
        element: <ClientDetailsPage></ClientDetailsPage>,
      },

      {
        path: "/volunteers",
        element: <Volunteers></Volunteers>
      },
      {
        path: "/volunteers/details/:id",
        element: <VolunteerDetailsPage></VolunteerDetailsPage>
      },
      {
        path: "/drivers/details/:id",
        element: <DriverDetailsPage></DriverDetailsPage>
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
        path:"/group/details/:id",
        element:<VolunteerGroupDetails></VolunteerGroupDetails>
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
  {
    path:"/accept-request/event/:eventId/user/:userId/type/:type",
    element:<Success></Success>
  },
  {
    path:"/cancel-request/event/:eventId/user/:userId/type/:type",
    element:<Cancel></Cancel>
  }

]);
