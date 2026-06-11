import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FilmsList } from "./frontend/scenes/FilmsList";
import { Film } from "./frontend/scenes/Film";
import { Marketplace } from "./frontend/scenes/Marketplace";
import {ThemeProvider} from "styled-components";
import {theme} from "./frontend/theme/theme";
import { GlobalStyles } from "./frontend/theme/global";

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
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
