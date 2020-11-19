import React from "react";
import classNames from "classnames";
import { X } from "react-feather";

interface ISidebarFriendProps {
  canDelete: boolean;
  friendImage: string;
  friendName: string;
  isOnline: boolean;
}

export const SidebarFriend: React.FC<ISidebarFriendProps> = ({
  canDelete,
  friendImage,
  friendName,
  isOnline,
}) => {
  return (
    <div className="card-body">
      <div className="media">
        <div
          className={classNames("avatar mr-5", { "avatar-online": isOnline })}
        >
          <img className="avatar-img" src={friendImage} alt={friendName} />
        </div>

        <div className="media-body align-self-center">
          <h6 className="mb-0">{friendName}</h6>
        </div>
        {canDelete && <X size={20} strokeWidth={1} />}
      </div>

      <a href="#" className="stretched-link"></a>
    </div>
  );
};
