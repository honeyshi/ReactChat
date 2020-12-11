import classNames from "classnames";
import React from "react";
import { propsToSpace, SpaceProps } from "../../common/utils/spaceUtil";

interface IAvatarProps extends SpaceProps {
  block?: boolean;
  displayNone?: boolean;
  imagePath: string;
  inlineBlock?: boolean;
  isOnline?: boolean;
  large?: boolean;
  small?: boolean;
}

export const Avatar: React.FC<IAvatarProps> = ({
  block,
  displayNone,
  imagePath,
  inlineBlock,
  isOnline,
  large,
  small,
  ...other
}) => {
  const classes = classNames(
    "avatar",
    {
      "avatar-xl": large,
      "avatar-sm": small,
      "avatar-online": isOnline,
      "d-none": displayNone,
      "d-lg-inline-block": inlineBlock,
      "d-lg-block": block,
    },
    propsToSpace(other)
  );
  return (
    <div className={classes}>
      <img className="avatar-img" src={imagePath} alt="" />
    </div>
  );
};
