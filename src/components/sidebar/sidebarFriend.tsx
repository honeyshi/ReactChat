import React from "react";
import classNames from "classnames";

interface ISidebarFriendProps {
  friendImage: string;
  friendName: string;
  friendStatus: string;
  isOnline: boolean;
}

export const SidebarFriend: React.FC<ISidebarFriendProps> = ({
  friendImage,
  friendName,
  friendStatus,
  isOnline
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
          <small className="text-muted">{friendStatus}</small>
        </div>
      </div>

      <a href="#" className="stretched-link"></a>
    </div>
  );
};
