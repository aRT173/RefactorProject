import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FilmsList } from "./frontend/scenes/FilmsList";
import { Film } from "./frontend/scenes/Film";
import { Marketplace } from "./frontend/scenes/Marketplace";
import { Bouncing } from "./frontend/scenes/Bouncing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FilmsList />,
  },
  {
    path: "/films/:id",
    element: <Film />,
  },
  {
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    path: "/bouncing",
    element: <Bouncing />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
