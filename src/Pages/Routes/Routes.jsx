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
import Services from "../Services/Services";
import Vendors from "../Vendors/Vendors";
import OrderPageSingle from "../Order/OrderPageSingle";

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
        path: "/order/:id",
        element: <OrderPageSingle />,
        
      },
      {
        path: "/vendors",
        element: <Vendors />,
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
      {
        path: "/category/categories",
        element: <Category></Category>,
      },
      {
        path: "/category/subCategory/:id",
        element: <SubCategory></SubCategory>,
      },
      {
        path: "/category/subCategory/services/:categoryId/:subcategoryId",
        element: <Services></Services>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default Routes;
