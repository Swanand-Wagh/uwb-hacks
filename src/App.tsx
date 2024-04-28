import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { GetDemo, HomePage } from "./pages";
import { SmartAppLayout } from "./components/layouts/SmartAppLayout";
import MyReport from "./pages/MyReport";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <SmartAppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "get-demo", element: <GetDemo /> },
      { path: "my-report", element: <MyReport /> },
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
]);

export const SmartApp: React.FC = (): JSX.Element => {
  return <RouterProvider router={appRouter} />;
};
