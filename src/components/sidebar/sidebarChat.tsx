import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "../../store/actions";

interface ISidebarChatProps {
  chatHeader: string;
  chatImage: string;
  chatType: number;
  lastMessageAuthor?: string;
  lastMessageText: string;
  lastMessageTime: string;
}

export const SidebarChat: React.FC<ISidebarChatProps> = ({
  chatHeader,
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
  return (
    <div
      className="card-body"
      onClick={() =>
        dispatch(
          setCurrentChat({
            chatHeader: chatHeader,
            chatImage: chatImage,
            chatType: chatType,
            isOnline: "Offline",
            chatMessages: [],
          })
        )
      }
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
