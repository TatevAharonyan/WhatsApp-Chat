/** @format */

import React, { FC } from "react";
import "../../styles/Text.css";

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

export const Text: FC<TextProps> = ({ children, className = "" }) => {
  return <p className={`text ${className}`}>{children}</p>;
};
