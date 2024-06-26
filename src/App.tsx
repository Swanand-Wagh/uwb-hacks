import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { GetDemo, HomePage, MyReport } from "./pages";
import { SmartAppLayout } from "./components/layouts/SmartAppLayout";

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
