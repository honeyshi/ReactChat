import React from "react";

interface ISidebarUserProfileInfoItemProps {
  itemHeader: string;
  itemValue: string;
}

export const SidebarUserProfileInfoItem: React.FC<ISidebarUserProfileInfoItemProps> = ({
  itemHeader,
  itemValue,
  children
}) => {
  return (
    <li className="list-group-item px-0 py-6">
      <div className="media align-items-center">
        <div className="media-body">
          <p className="small text-muted mb-0">{itemHeader}</p>
          <p>{itemValue}</p>
        </div>
        {children}
      </div>
    </li>
  );
};
