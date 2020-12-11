import React, { useState } from "react";
import { X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, CheckBox } from "../base";
import { setCurrentChat } from "../../store/actions";
import { ChatType } from "../../common/variables";
import {
  performGetMessagesRequest,
  performGetUserNoteRequest,
  performRemoveBlockedUserRequest,
} from "../../common/requests";
import { RootState } from "../../store/stores";
import { getChatIdByUserLogin } from "../../common/functions";

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
  const userNote = useSelector(
    (state: RootState) => state.chat.chatItem.userNote
  );
  const chatId = getChatIdByUserLogin(
    useSelector((state: RootState) => state.sidebar.sidebarDialogs),
    friendName
  );

  return (
    <div className="card-body">
      <div className="media">
        <Avatar imagePath={friendImage} isOnline={isOnline} mr="5" />

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
          onClick={() => {
            dispatch(
              setCurrentChat({
                chatHeader: friendName,
                chatId: chatId === undefined ? "" : chatId,
                chatImage: friendImage,
                chatType: ChatType.private,
                isOnline: isOnline ? "Online" : "Offline",
                chatMessages: [],
                userNote: userNote,
              })
            );
            performGetUserNoteRequest(userId, friendName);
            chatId !== undefined &&
              performGetMessagesRequest(userId, chatId, 0);
          }}
        />
      )}
    </div>
  );
};
