import React, { useCallback, useState } from "react";
import classNames from "classnames";
import { X } from "react-feather";
import { CheckBox } from "../base";

interface ISidebarFriendProps {
  canDelete: boolean;
  friendImage: string;
  friendName: string;
  isOnline: boolean;
  canChoose: boolean;
  checkboxName?: string;
}

export const SidebarFriend: React.FC<ISidebarFriendProps> = ({
  canDelete,
  friendImage,
  friendName,
  isOnline,
  canChoose,
  checkboxName,
}) => {
  const [checked, setChecked] = useState(false);
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
        {canChoose && (
          <div className="align-self-center ml-auto">
            <CheckBox
              name={checkboxName}
              value={checked}
              onChange={(checkedValue) => setChecked(!checkedValue)}
              disabled={false}
            />
          </div>
        )}
      </div>

      {!canChoose && <a href="#" className="stretched-link"></a>}
    </div>
  );
};
