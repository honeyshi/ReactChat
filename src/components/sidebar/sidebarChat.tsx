import React from "react";
import classNames from "classnames";

interface ISidebarChatProps {
  chatHeader: string;
  chatImage: string;
  isOnline: boolean;
  lastMessageAuthor?: string;
  lastMessageText: string;
  lastMessageTime: string;
}

export const SidebarChat: React.FC<ISidebarChatProps> = ({
  chatHeader,
  chatImage,
  isOnline,
  lastMessageAuthor,
  lastMessageText,
  lastMessageTime
}) => {
  const lastMessageFullText =
    lastMessageAuthor === undefined
      ? lastMessageText
      : (lastMessageAuthor += `: ${lastMessageText}`);
  return (
    <div className="card-body">
      <div className="media">
        <div
          className={classNames("avatar mr-5", { "avatar-online": isOnline })}
        >
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
