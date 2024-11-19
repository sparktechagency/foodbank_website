import {
    createBrowserRouter,
  } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import UserManagement from "../page/UserManagement/UserManagement";
import CreatorManagement from "../page/CreatorManagement/CreatorManagement";
import CategoriesManagement from "../page/CategoriesManagement/CategoriesManagement";
import Subscription from "../page/Subscription/Subscription";
import Settings from "../page/Settings/Settings";
import Profile from "../page/Settings/Profile";
import TermsCondition from "../page/Settings/TermsCondition";
import FAQ from "../page/Settings/FAQ";
import PrivacyPolicy from "../page/Settings/PrivacyPolicy";
import Categories from "../page/CategoriesManagement/Categories";
import Subcategory from "../page/CategoriesManagement/Subcategory";

  export const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <DashboardLayout></DashboardLayout>,
      children:[
        {
          path: '/dashboard', 
          element: <Dashboard></Dashboard>
        },
        {
            path: '/dashboard/UserManagement', 
            element: <UserManagement></UserManagement>
        },
        {
          path: '/dashboard/CreatorManagement', 
          element: <CreatorManagement></CreatorManagement>
        },
        {
          path: '/dashboard/CategoriesManagement', 
          element: <CategoriesManagement></CategoriesManagement>
        },
        {
          path: '/dashboard/CategoriesManagement/Categories', 
          element: <Categories></Categories>
        },
        {
          path: '/dashboard/CategoriesManagement/Subcategory', 
          element: <Subcategory></Subcategory>
        },
        {
        path: '/dashboard/Subscription', 
        element: <Subscription></Subscription>
        },
        {
          path: '/dashboard/Settings', 
          element: <Settings></Settings>
        },
        {
          path: '/dashboard/Settings/profile', 
          element: <Profile></Profile>
        },
        {
          path: '/dashboard/Settings/Terms&Condition', 
          element: <TermsCondition></TermsCondition>
        },
        {
          path: '/dashboard/Settings/FAQ', 
          element: <FAQ></FAQ>
        },
        {
          path: '/dashboard/Settings/PrivacyPolicy', 
          element: <PrivacyPolicy></PrivacyPolicy>
        },
      ]
    },
  ]);

