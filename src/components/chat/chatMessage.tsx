import React from "react";
import classNames from "classnames";
import { Trash2 } from "react-feather";
import { useSelector } from "react-redux";
import { RootState } from "../../store/stores";
import { IChatMessageItem } from "../../common/interfaces";
import { Avatar, TextField } from "../base";
import { DeleteMessage } from "./deleteMessage";

import "./message.scss";

export const ChatMessage: React.FC<IChatMessageItem> = ({
  isRight,
  messageId,
  messageText,
  messageTime,
  senderName,
  userImage,
}) => {
  const isAdmin = useSelector(
    (state: RootState) => state.chat.chatItem.isAdmin
  );
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
            {/* Button for own messages deletion */}
            {isRight && <DeleteMessage messageId={messageId} mr="3" />}
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
            {/* Button for admin to delete other's messages */}
            {!isRight && isAdmin && (
              <DeleteMessage messageId={messageId} ml="3" />
            )}
          </div>
        </div>
        {/* Message: row */}
      </div>
      {/* Message: Body */}
    </div>
  );
};
