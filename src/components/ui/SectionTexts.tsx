import React from "react";
import SectionTextStyles from "@/styles/components/ui/sectionTexts.module.css";
import { ISectionTextsComponentProps } from "@/interfaces/ui";

export const SectionTexts: React.FC<ISectionTextsComponentProps> = ({
  className,
  children,
  ...restComponentProps
}): JSX.Element => {
  return (
    <p className={`${SectionTextStyles.sectionTexts}${className ? ` ${className}` : ""}`} {...restComponentProps}>
      {children}
    </p>
  );
};
