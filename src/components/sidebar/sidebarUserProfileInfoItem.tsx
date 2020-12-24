import React from "react";
import { TextField } from "components";

interface ISidebarUserProfileInfoItemProps {
  itemHeader: string;
  itemValue?: string;
}

export const SidebarUserProfileInfoItem: React.FC<ISidebarUserProfileInfoItemProps> = ({
  itemHeader,
  itemValue,
  children,
}) => {
  return (
    <li className="list-group-item px-0 py-6">
      <div className="media align-items-center">
        <div className="media-body">
          <TextField type="p" text={itemHeader} small muted mb="0" />
          <TextField type="p" text={itemValue} />
        </div>
        {children}
      </div>
    </li>
  );
};
