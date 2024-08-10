import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Order from "../Order/Order";
import Category from "../Category/Category";
import VendorApplication from "../VendorApplication/VendorApplication";
import VendorApplicationSingle from "../VendorApplication/VendorApplicationSingle";
import { MainApiLink } from "../../App";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/application",
        element: <VendorApplication />,
      },
      {
        path: "/application/single/:id",
        element: <VendorApplicationSingle />,
        
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default Routes;
