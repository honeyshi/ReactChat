import React from "react";
import classNames from "classnames";
import { IChatMessageItem } from "../../common/interfaces";
import "./message.scss";
import { Avatar, TextField } from "../base";

export const ChatMessage: React.FC<IChatMessageItem> = ({
  isRight,
  messageId,
  messageText,
  messageTime,
  senderName,
  userImage,
}) => {
  return (
    <div className={classNames("message", { "message-right": isRight })}>
      {/* Avatar */}
      <Avatar
        small
        displayNone
        block
        imagePath={userImage}
        mr={!isRight ? "4" : undefined}
        mr_lg={!isRight ? "5" : undefined}
        ml={isRight ? "4" : undefined}
        ml_lg={isRight ? "5" : undefined}
      />
      {/* Message: Body */}
      <div className="message-body">
        {/* Message: row */}
        <div className="message-row">
          <div
            className={classNames("d-flex align-items-center", {
              "justify-content-end": isRight,
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
              <TextField
                type="h6"
                text={senderName}
                style={{
                  display: isRight ? "none" : "block",
                }}
              />
              <TextField type="div" text={messageText} />

              <div className="mt-1">
                <TextField
                  type="small"
                  text={messageTime}
                  classes="opacity-65"
                />
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
