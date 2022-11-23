import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Router,
  Link,
} from "react-router-dom";

import App from "./App";
import Card from "./components/Card";
import User from "./components/User";

import "./index.css";

// nested component react with children
const Home = () => {
  return (
    <App>
      <Card />
    </App>
  );
};

const Setting = () => {
  return (
    <App>
      <User />
    </App>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "user",
    element: <Setting />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
