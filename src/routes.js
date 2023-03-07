import { createBrowserRouter } from "react-router-dom";
import Guest from "./layouts/guest";
import User from "./layouts/user";
import Register from "./views/register";
import Login from "./views/login";
import Dashboard from "./views/dashboard";
import Forgot from "./views/forgot";
import Reset from "./views/reset";
import Verify from "./views/verify";
import Stipends from "./views/stipends";
import Transactions from "./views/transactions";
import Bills from "./views/bills";
import Banks from "./views/banks";
import Settings from "./views/settings";

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
      {
        path: "/stipends",
        element: <Stipends />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/bills",
        element: <Bills />,
      },
      {
        path: "/bank",
        element: <Banks />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/verify",
    element: <Verify />,
  },
]);

export default routes;
