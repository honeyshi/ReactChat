import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  performGetGroupChatMembers,
  performGetMessagesRequest,
} from "../../common/requests";
import { ChatType } from "../../common/variables";
import { setCurrentChat } from "../../store/actions";
import { RootState } from "../../store/stores";
import { Avatar, TextField } from "../base";

interface ISidebarChatProps {
  chatHeader: string;
  chatId: string;
  chatImage: string;
  chatType: number;
  isUserAdmin: boolean;
  isUserOnline: boolean;
  lastMessageText: string;
  lastMessageTime: string;
}

export const SidebarChat: React.FC<ISidebarChatProps> = ({
  chatHeader,
  chatId,
  chatImage,
  chatType,
  isUserAdmin,
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
            isAdmin: isUserAdmin,
            isOnline: isUserOnline ? "Online" : "Offline",
            chatMessages: [],
            userNote: userNote,
          })
        );
        performGetMessagesRequest(userId, chatId, 0);
        chatType === ChatType.group && performGetGroupChatMembers(chatId);
      }}
    >
      <div className="media">
        <Avatar imagePath={chatImage} isOnline={isUserOnline} mr="5" />

        <div className="media-body overflow-hidden">
          <div className="d-flex align-items-center mb-1">
            <TextField type="h6" text={chatHeader} truncate mb="0" mr="auto" />
            <TextField
              type="p"
              text={lastMessageTime}
              small
              muted
              nowrap
              ml="4"
            />
          </div>
          <TextField type="div" text={lastMessageText} truncate />
        </div>
      </div>
    </div>
  );
};
