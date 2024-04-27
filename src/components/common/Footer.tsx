import React from "react";
import FooterStyles from "@/styles/components/common/footer.module.css";
import { Link } from "react-router-dom";

export const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className={FooterStyles.appFooter}>
      <div className={FooterStyles.footerSections}>
        <span className={FooterStyles.footerSectionHeadings}>Smart Interview Prep</span>
        <p className={FooterStyles.footerSectionTexts}>
          Interview AI aims to revolutionize the interview preparation process by leveraging advanced technology to
          provide personalized guidance and feedback.
        </p>
      </div>
      <nav className={FooterStyles.footerSections}>
        <span className={FooterStyles.footerSectionHeadings}>Quick Links</span>
        <ul className={FooterStyles.footerNavLinks}>
          <li className={FooterStyles.footerSectionTexts}>
            <Link to="/" className={FooterStyles.footerNavLinkItems}>
              Home
            </Link>
          </li>
          <li className={FooterStyles.footerSectionTexts}>
            <Link to="/get-demo" className={FooterStyles.footerNavLinkItems}>
              Get a Demo
            </Link>
          </li>
          <li className={FooterStyles.footerSectionTexts}>
            <Link to="/" className={FooterStyles.footerNavLinkItems}>
              Know More About Project
            </Link>
          </li>
        </ul>
      </nav>
      <div className={FooterStyles.footerSectionDivider}></div>
      <small className={`${FooterStyles.footerSectionTexts} ${FooterStyles.footerCopyrightText}`}>
        2024 &copy; All Rights Reserved | Designed and Developed by <span>Swanand, Andres & Hayden</span>
      </small>
    </footer>
  );
};
