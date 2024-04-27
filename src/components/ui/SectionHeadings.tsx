import React from "react";
import SectionHeadingStyles from "@/styles/components/ui/sectionHeadings.module.css";
import { ISectionHeadingsComponentProps } from "@/interfaces/ui";

export const SectionHeadings: React.FC<ISectionHeadingsComponentProps> = ({
  className,
  children,
  ...restComponentProps
}): JSX.Element => {
  return (
    <h1
      className={`${SectionHeadingStyles.sectionHeadings}${className ? ` ${className}` : ""}`}
      {...restComponentProps}
    >
      {children}
    </h1>
  );
};
