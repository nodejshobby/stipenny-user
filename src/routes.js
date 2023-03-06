import { createBrowserRouter } from "react-router-dom";
import Guest from "./layouts/guest";
import User from "./layouts/user";
import Register from "./views/register";
import Login from "./views/login";
import Dashboard from "./views/dashboard";
import Forgot from "./views/forgot";
import Reset from "./views/reset";
import Verify from "./views/verify";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Guest />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot",
        element: <Forgot />,
      },
      {
        path: "/reset",
        element: <Reset />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
    ],
  },
  {
    path: "/",
    element: <User />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default routes;
