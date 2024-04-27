import React from "react";
import SmartAppStyles from "@/styles/app.module.css";
import { Outlet } from "react-router-dom";
import { Footer, HeaderBar } from "@/components/common";

export const SmartAppLayout: React.FC = (): JSX.Element => {
  return (
    <div className={SmartAppStyles.appContainer}>
      <HeaderBar />
      <Outlet />
      <Footer />
    </div>
  );
};
