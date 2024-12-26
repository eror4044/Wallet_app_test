import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const SmBox: React.FC<Props> = ({ children, className }) => {
  return <div className={`sm-box ` + className}>{children}</div>;
};
