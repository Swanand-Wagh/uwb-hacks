import React from "react";
import HomePageStyles from "@/styles/pages/homePage.module.css";
import { Link } from "react-router-dom";
import { SectionHeadings } from "../components/ui/SectionHeadings";
import { PurpleButton, SectionTexts } from "@/components/ui";

export const HomePage: React.FC = (): JSX.Element => {
  return (
    <main className={HomePageStyles.homePageMain}>
      <div className={HomePageStyles.pageContentContainer}>
        <SectionHeadings>Smart Interview Prep</SectionHeadings>
        <SectionTexts>
          Our project aims to revolutionize interview preparation by harnessing the power of AI to facilitate seamless
          audio recording and management. With our innovative solution, users can effortlessly capture their voice
          recordings, ensuring every crucial detail and insight is preserved. Say goodbye to cumbersome recording
          processes and hello to a more streamlined and effective interview preparation experience.
        </SectionTexts>
        <Link to="/" target="_blank" className={HomePageStyles.projectInfoLink}>
          <PurpleButton>Know More About Project</PurpleButton>
        </Link>
      </div>
      <div className={HomePageStyles.pageIllustrationContainer}>
        <img
          src="https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg"
          alt="interview_prep"
          className={HomePageStyles.pageIllustration}
        />
      </div>
    </main>
  );
};
