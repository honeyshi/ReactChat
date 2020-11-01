import React from "react";
import { ISidebarUserProfileProps } from "../../common/interfaces";

export const SidebarUserProfile: React.FC<ISidebarUserProfileProps> = ({
  userDescription,
  userImage,
  userName
}) => {
  return (
    <div className="card-body">
      <div className="text-center py-6">
        <div className="avatar avatar-xl mb-5">
          <img className="avatar-img" src={userImage} alt="" />
        </div>

        <h5>{userName}</h5>
        <p className="text-muted">{userDescription}</p>
      </div>
    </div>
  );
};
