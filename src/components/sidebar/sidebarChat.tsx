import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  performGetMessagesRequest,
  performGetUserNoteRequest,
} from "../../common/requests";
import { ChatType } from "../../common/variables";
import { setCurrentChat } from "../../store/actions";
import { RootState } from "../../store/stores";

interface ISidebarChatProps {
  chatHeader: string;
  chatId: string;
  chatImage: string;
  chatType: number;
  lastMessageAuthor?: string;
  lastMessageText: string;
  lastMessageTime: string;
}

export const SidebarChat: React.FC<ISidebarChatProps> = ({
  chatHeader,
  chatId,
  chatImage,
  chatType,
  lastMessageAuthor,
  lastMessageText,
  lastMessageTime,
}) => {
  const lastMessageFullText =
    lastMessageAuthor === undefined
      ? lastMessageText
      : (lastMessageAuthor += `: ${lastMessageText}`);
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
            isOnline: "Offline",
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
        <div className="avatar mr-5">
          <img className="avatar-img" src={chatImage} alt="" />
        </div>

        <div className="media-body overflow-hidden">
          <div className="d-flex align-items-center mb-1">
            <h6 className="text-truncate mb-0 mr-auto">{chatHeader}</h6>
            <p className="small text-muted text-nowrap ml-4">
              {lastMessageTime}
            </p>
          </div>
          <div className="text-truncate">{lastMessageFullText}</div>
        </div>
      </div>
    </div>
  );
};
