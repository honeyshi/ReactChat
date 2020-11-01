import React from "react";
import classNames from "classnames";

import "./button.scss";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classes?: string;
  isPrimary: boolean;
  shapeType?: string;
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Button: React.FC<IButtonProps> = ({
  classes,
  isPrimary,
  shapeType,
  text,
  onClick,
  children
}) => {
  return (
    <button
      className={classNames("btn", shapeType, classes, {
        "btn-primary": isPrimary
      })}
      type="button"
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
};
