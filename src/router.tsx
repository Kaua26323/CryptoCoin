import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./components/layout";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";
import { Error } from "./pages/Erro";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:cripto",
        element: <Details />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
