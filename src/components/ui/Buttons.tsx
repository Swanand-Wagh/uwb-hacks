import React from "react";
import ButtonStyles from "@/styles/components/ui/buttons.module.css";
import { IButtonComponentProps } from "@/interfaces/ui";

export const BlackButton: React.FC<IButtonComponentProps> = ({ className, ...restComponentProps }): JSX.Element => {
  return (
    <button
      {...restComponentProps}
      className={`${ButtonStyles.buttons} ${ButtonStyles.blackButton}${className ? ` ${className}` : ""}`}
    />
  );
};

export const PurpleButton: React.FC<IButtonComponentProps> = ({ className, ...restComponentProps }): JSX.Element => {
  return (
    <button
      {...restComponentProps}
      className={`${ButtonStyles.buttons} ${ButtonStyles.purpleButton}${className ? ` ${className}` : ""}`}
    />
  );
};
