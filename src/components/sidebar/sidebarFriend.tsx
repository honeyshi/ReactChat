import React, { useState } from "react";
import classNames from "classnames";
import { X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox } from "../base";
import { setCurrentChat } from "../../store/actions";
import { ChatType } from "../../common/variables";
import { performRemoveBlockedUserRequest } from "../../common/requests";
import { RootState } from "../../store/stores";

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
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.root.userId);

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
        {canDelete && (
          <X
            size={20}
            strokeWidth={1}
            onClick={() => performRemoveBlockedUserRequest(userId, friendName)}
            cursor="pointer"
          />
        )}
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

      {!(canChoose || canDelete) && (
        <a
          className="stretched-link"
          onClick={() =>
            dispatch(
              setCurrentChat({
                chatHeader: friendName,
                chatImage: friendImage,
                chatType: ChatType.private,
                isOnline: isOnline ? "Online" : "Offline",
                chatMessages: [],
              })
            )
          }
        />
      )}
    </div>
  );
};
