import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  performGetMessagesRequest,
  performGetUserNoteRequest,
} from "../../common/requests";
import { ChatType } from "../../common/variables";
import { setCurrentChat } from "../../store/actions";
import { RootState } from "../../store/stores";
import { Avatar } from "../base";

interface ISidebarChatProps {
  chatHeader: string;
  chatId: string;
  chatImage: string;
  chatType: number;
  isUserOnline: boolean;
  lastMessageText: string;
  lastMessageTime: string;
}

export const SidebarChat: React.FC<ISidebarChatProps> = ({
  chatHeader,
  chatId,
  chatImage,
  chatType,
  isUserOnline,
  lastMessageText,
  lastMessageTime,
}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.root.userId);
  const userNote = useSelector(
    (state: RootState) => state.chat.chatItem.userNote
  );
  return (
    <div
      className="card-body"
      onClick={() => {
        dispatch(
          setCurrentChat({
            chatHeader: chatHeader,
            chatId: chatId,
            chatImage: chatImage,
            chatType: chatType,
            isOnline: isUserOnline ? "Online" : "Offline",
            chatMessages: [],
            userNote: userNote,
          })
        );
        chatType === ChatType.private &&
          performGetUserNoteRequest(userId, chatHeader);
        performGetMessagesRequest(userId, chatId, 0);
      }}
    >
      <div className="media">
        <Avatar imagePath={chatImage} isOnline={isUserOnline} mr="5" />

        <div className="media-body overflow-hidden">
          <div className="d-flex align-items-center mb-1">
            <h6 className="text-truncate mb-0 mr-auto">{chatHeader}</h6>
            <p className="small text-muted text-nowrap ml-4">
              {lastMessageTime}
            </p>
          </div>
          <div className="text-truncate">{lastMessageText}</div>
        </div>
      </div>
    </div>
  );
};
