import React from "react";

interface ITextAreaProps {
  classes: string;
  name: string;
  id: string;
  placeholder: string;
  rows: string;
}

export const TextArea: React.FC<ITextAreaProps> = { classes, name, id };
