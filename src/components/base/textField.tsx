import React from "react";
import classNames from "classnames";
import { propsToSpace, SpaceProps } from "common/utils/spaceUtil";

interface IDisplayStyle {
  display: string;
}

interface ITextFieldProps extends SpaceProps {
  classes?: string;
  bold?: boolean;
  center?: boolean;
  danger?: boolean;
  muted?: boolean;
  nowrap?: boolean;
  small?: boolean;
  style?: IDisplayStyle;
  text?: string;
  truncate?: boolean;
  type: React.ElementType;
}

export const TextField: React.FC<ITextFieldProps> = ({
  classes,
  bold,
  center,
  danger,
  muted,
  nowrap,
  small,
  style,
  text,
  truncate,
  type: Tag,
  children,
  ...other
}) => {
  const textClasses = classNames(
    classes,
    {
      "font-bold": bold,
      "text-center": center,
      "text-danger": danger,
      "text-muted": muted,
      "text-nowrap": nowrap,
      small: small,
      "text-truncate": truncate,
    },
    propsToSpace(other)
  );
  if (text !== "") {
    return (
      <Tag className={textClasses} style={style}>
        {text}
        {children}
      </Tag>
    );
  }
  return null;
};
