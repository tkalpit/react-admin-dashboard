import React from "react";
import ReactDOM from "react-dom/client";
import Admin from "./Components/Admin/Admin";
import Home from "./Components/User/Home/Home";
import "./Reset.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingleProductInfo from "./Components/User/Product/Product";
import Shop from "./Components/User/Shop/Shop";
import Login from "./Components/Authentication/Login/Login";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute";
import Logout from "./Components/Authentication/Logout";

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
        element: <Admin />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category",
        element: <Shop />,
      },
      {
        path: "/products/:productID",
        element: <SingleProductInfo />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
