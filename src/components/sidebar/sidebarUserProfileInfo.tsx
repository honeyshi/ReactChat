import React from "react";
import { ISidebarUserInfoItem } from "common/interfaces";
import { SidebarUserProfileInfoItem } from "components";

interface ISidebarUserProfileInfoProps {
  infoItems: ISidebarUserInfoItem[];
}

export const SidebarUserProfileInfo: React.FC<ISidebarUserProfileInfoProps> = ({
  infoItems,
}) => {
  return (
    <div className="card-body">
      <ul className="list-group list-group-flush">
        {infoItems.map((infoItem) => {
          return (
            <SidebarUserProfileInfoItem
              itemHeader={infoItem.itemHeader}
              itemValue={infoItem.itemValue}
            >
              <infoItem.icon className="text-muted" size={15} />
            </SidebarUserProfileInfoItem>
          );
        })}
      </ul>
    </div>
  );
};
