import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Order from "../Order/Order";
import VendorApplication from "../VendorApplication/VendorApplication";
import VendorApplicationSingle from "../VendorApplication/VendorApplicationSingle";
import { MainApiLink } from "../../App";
import Category from "../Category/Categories/Categories";
import SubCategory from "../SubCategory/SubCategory/SubCategory";

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
  {
    path : "/category",
    element : <Category />,
    children : [
      {
        path : "/category/categories",
        element : <Category></Category>
      },
      {
        path : "/category/subCategory/:id",
        element : <SubCategory></SubCategory>
      }
    ]
  }
]);

export default Routes;
