import React from "react";
import { ISidebarUserProfileProps } from "../../common/interfaces";
import { Avatar, TextField } from "../base";

export const SidebarUserProfile: React.FC<ISidebarUserProfileProps> = ({
  userDescription,
  userImage,
  userName,
}) => {
  return (
    <div className="card-body">
      <div className="text-center py-6">
        <Avatar large mb="5" imagePath={userImage} />
        <TextField type="h5" text={userName} />
        <TextField type="p" text={userDescription} muted />
      </div>
    </div>
  );
};
