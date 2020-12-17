import React from "react";
import { TextField } from "../base";

interface ISidebarTitleProps {
  text: string;
}

export const SidebarTitle: React.FC<ISidebarTitleProps> = ({ text }) => {
  return <TextField type="h2" text={text} bold mb="6" />;
};
