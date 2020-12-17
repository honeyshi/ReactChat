import React from "react";
import classNames from "classnames";

import "./button.scss";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  shapeType?: string;
  long?: boolean;
  basic?: boolean;
  flex?: boolean;
  alignCenter?: boolean;
  block?: boolean;
  icon?: boolean;
  secondary?: boolean;
  minimal?: boolean;
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Button: React.FC<IButtonProps> = ({
  primary,
  shapeType,
  long,
  basic,
  flex,
  alignCenter,
  block,
  icon,
  secondary,
  minimal,
  text,
  onClick,
  children,
  ...other
}) => {
  const classes = classNames("btn", shapeType, {
    "btn-primary": primary,
    "btn-lg": long,
    "btn-block": block,
    "btn-basic": basic,
    "d-flex": flex,
    "align-items-center": alignCenter,
    "btn-ico": icon,
    "btn-secondary": secondary,
    "btn-minimal": minimal,
  });
  return (
    <button className={classes} type="button" onClick={onClick} {...other}>
      {text}
      {children}
    </button>
  );
};
