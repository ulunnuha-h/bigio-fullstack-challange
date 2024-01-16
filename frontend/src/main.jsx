import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddStory from "./pages/addStory.jsx";
import EditStory from "./pages/EditStory.jsx";
import DetailStory from "./pages/DetailStory.jsx";

const root = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add",
    element: <AddStory />,
  },
  {
    path: "/edit/:id",
    element: <EditStory />,
  },
  {
    path: "/story/:id",
    element: <DetailStory />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={root} />
  </React.StrictMode>
);
