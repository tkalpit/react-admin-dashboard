import React from 'react';
import ReactDOM from 'react-dom/client';
import Admin from './Components/Admin/Admin';
import Home from './Components/User/Home/Home';
import "./Reset.scss";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Admin/>
  },
  {
    path: "/",
    element: <Home/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);