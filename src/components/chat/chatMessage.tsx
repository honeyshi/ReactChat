import React from "react";
import classNames from "classnames";
import "./message.scss";

interface IChatMessageProps {
  isRight: boolean;
  messageText: string;
  messageTime: string;
  senderName?: string;
  userImage?: string;
}

export const ChatMessage: React.FC<IChatMessageProps> = ({
  isRight,
  messageText,
  messageTime,
  senderName,
  userImage
}) => {
  return (
    <div className={classNames("message", { "message-right": isRight })}>
      {/* Avatar */}
      <div className="avatar avatar-sm mr-4 mr-lg-5">
        <img className="avatar-img" src={userImage} alt=""></img>
      </div>
      {/* Message: Body */}
      <div className="message-body">
        {/* Message: row */}
        <div className="message-row">
          <div
            className={classNames("d-flex align-items-center", {
              "justify-content-end": isRight
            })}
          >
            {/* Message: content */}
            <div
              className={classNames(
                "message-content",
                { "bg-primary": isRight },
                { "text-white": isRight },
                { "bg-light": !isRight }
              )}
            >
              <h6
                className="mb-2"
                style={{
                  display: isRight ? "none" : "block"
                }}
              >
                {senderName}
              </h6>
              <div>{messageText}</div>

              <div className="mt-1">
                <small className="opacity-65">{messageTime}</small>
              </div>
            </div>
            {/* Message: content */}
          </div>
        </div>
        {/* Message: row */}
      </div>
      {/* Message: Body */}
    </div>
  );
};
