import React from "react";

interface ISidebarItemProps extends React.HTMLAttributes<any> {
  classes: string;
  type: React.ElementType;
}

export const SidebarItem: React.FC<ISidebarItemProps> = ({
  classes,
  type: Tag,
  children
}) => {
  return <Tag className={classes}>{children}</Tag>;
};
