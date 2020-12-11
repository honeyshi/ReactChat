import React, { useState } from "react";
import { useSelector } from "react-redux";

import { ChatHeader } from "./chatHeader";
import { ChatMessage } from "./chatMessage";
import { ChatFooter } from "./chatFooter";
import { ChatContent } from "./chatContent";
import { ChatDescription } from "./chatDescription";
import { RootState } from "../../store/stores";
import { ChatType } from "../../common/variables";
import { TextField } from "../base";
import { performGetUserNoteRequest } from "../../common/requests";

import "../layout.scss";

export const ChatLayout: React.FC = () => {
  const [isActiveDescription, setDescriptionStatus] = useState<boolean>(false);
  const chatState = useSelector((state: RootState) => state.chat.chatItem);
  const userId = useSelector((state: RootState) => state.root.userId);

  const chatMessageComponents = chatState.chatMessages.map(
    (chatMessageInfo) => {
      return (
        <ChatMessage
          isRight={chatMessageInfo.isRight}
          messageId={chatMessageInfo.messageId}
          messageText={chatMessageInfo.messageText}
          messageTime={chatMessageInfo.messageTime}
          senderName={chatMessageInfo.senderName}
          userImage={chatMessageInfo.userImage}
          key={chatMessageInfo.messageId}
        />
      );
    }
  );

  return (
    <div className="main main-visible">
      {/*<!-- Chat -->*/}
      {chatState.chatHeader !== "" ? (
        <div className="chat dropzone-form-js">
          {/*<!-- Chat: body -->*/}
          <div className="chat-body">
            <ChatHeader
              chatImage={chatState.chatImage}
              chatName={chatState.chatHeader}
              chatStatus={
                chatState.chatType === ChatType.private
                  ? chatState.isOnline
                  : ""
              }
              onDetailsClick={() => {
                setDescriptionStatus(true);
                chatState.chatType === ChatType.private &&
                  performGetUserNoteRequest(userId, chatState.chatHeader);
              }}
            />
            {chatState.chatMessages.length !== 0 ? (
              <ChatContent>{chatMessageComponents}</ChatContent>
            ) : (
              <ChatContent>
                <TextField
                  isCenter={true}
                  isBold={false}
                  type="p"
                  text="You do not have messages yet."
                />
              </ChatContent>
            )}
            <ChatFooter />
          </div>
          {chatState.chatType === ChatType.private && (
            <ChatDescription
              avatarUrl={chatState.chatImage}
              isActive={isActiveDescription}
              onCloseClick={() => setDescriptionStatus(false)}
              userLogin={chatState.chatHeader}
              userNote={chatState.userNote}
            />
          )}
        </div>
      ) : (
        <div className="chat flex-column justify-content-center text-center">
          {/*<!-- Chat: body when chat is not selected -->*/}
          <div className="container-xxl">
            <TextField
              isCenter={true}
              isBold={false}
              type="p"
              text="Please select a chat to start messaging."
            />
          </div>
        </div>
      )}
    </div>
  );
};
