import React from 'react';
import ReactDOM from 'react-dom/client';
import Admin from './Components/Admin/Admin';
import Home from './Components/User/Home/Home';
import "./Reset.scss";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SingleProductInfo from './Components/User/Product/Product';
import Shop from './Components/User/Shop/Shop';

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Admin/>
  },
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/category",
    element: <Shop/>
  },
  {
    path: "/products/:productID",
    element: <SingleProductInfo/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);