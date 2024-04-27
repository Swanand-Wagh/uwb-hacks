import React from "react";
import LoaderStyles from "@/styles/components/common/loader.module.css";

export const Loader: React.FC = (): JSX.Element => {
  return (
    <div className={LoaderStyles.loaderContainer}>
      <div className={LoaderStyles.loaderDefault}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
