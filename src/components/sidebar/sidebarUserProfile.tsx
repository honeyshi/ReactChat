import React from "react";
import { ISidebarUserProfileProps } from "../../common/interfaces";
import { Avatar } from "../base";

export const SidebarUserProfile: React.FC<ISidebarUserProfileProps> = ({
  userDescription,
  userImage,
  userName,
}) => {
  return (
    <div className="card-body">
      <div className="text-center py-6">
        <Avatar large mb="5" imagePath={userImage} />

        <h5>{userName}</h5>
        <p className="text-muted">{userDescription}</p>
      </div>
    </div>
  );
};
