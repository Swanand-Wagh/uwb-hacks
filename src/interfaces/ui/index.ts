import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export interface IButtonComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export interface ISectionHeadingsComponentProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export interface ISectionTextsComponentProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}
