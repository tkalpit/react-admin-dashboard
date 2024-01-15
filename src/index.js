import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./Reset.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Authentication/Login/Login";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute";
import Logout from "./Components/Authentication/Logout";

const SingleProductInfo = lazy(() => import("./Components/User/Product/Product"));
const Admin = lazy(() => import("./Components/Admin/Admin"));
const Home = lazy(() => import("./Components/User/Home/Home"));
const Shop = lazy(() => import("./Components/User/Shop/Shop"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <Suspense><Admin /></Suspense>,
      },
      {
        path: "/",
        element: <Suspense><Home /></Suspense>,
      },
      {
        path: "/category",
        element: <Suspense><Shop /></Suspense>,
      },
      {
        path: "/products/:productID",
        element: <Suspense><SingleProductInfo /></Suspense>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
