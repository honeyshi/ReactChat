import React from "react";

interface ISidebarTitleProps {
  text: string;
}

export const SidebarTitle: React.FC<ISidebarTitleProps> = ({ text }) => {
  return <h2 className="font-bold mb-6">{text}</h2>;
};
