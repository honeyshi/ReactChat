import React from "react";
import classNames from "classnames";

interface ITextFieldProps {
  classes?: string;
  isBold: boolean;
  isCenter: boolean;
  text?: string;
  type: React.ElementType;
}

export const TextField: React.FC<ITextFieldProps> = ({
  classes,
  isBold,
  isCenter,
  text,
  type: Tag,
  children,
}) => {
  if (text !== "") {
    return (
      <Tag
        className={classNames(
          { "font-bold": isBold },
          { "text-center": isCenter },
          classes
        )}
      >
        {text}
        {children}
      </Tag>
    );
  }
  return null;
};
