import React from "react";
import HeaderBarStyles from "@/styles/components/common/headerBar.module.css";
import { Link } from "react-router-dom";
import { BlackButton } from "@/components/ui";
import logo from "../../assets/logo.png";

export const HeaderBar: React.FC = (): JSX.Element => {
  return (
    <header className={HeaderBarStyles.headerBar}>
      <Link to="/" className={HeaderBarStyles.headerBarLogo}>
        <img src={logo} alt="Socraitive" style={{ width: "10rem" }} />
      </Link>
      <Link to="/get-demo" className={HeaderBarStyles.headerBarGetDemoLink}>
        <BlackButton>Get a Demo</BlackButton>
      </Link>
    </header>
  );
};
