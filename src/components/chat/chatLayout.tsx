import React, { useState } from "react";
import { useSelector } from "react-redux";
import DotLoader from "react-spinners/DotLoader";
import {
  ChatHeader,
  ChatMessage,
  ChatFooter,
  ChatContent,
  ChatDescription,
  GroupChatDescription,
  TextField,
} from "components";
import { RootState } from "store/stores";
import { ChatType } from "common/variables";
import { performGetUserNoteRequest } from "common/requests";

import "../layout.scss";

export const ChatLayout: React.FC = () => {
  const [isActiveDescription, setDescriptionStatus] = useState<boolean>(false);
  const chatState = useSelector((state: RootState) => state.chat.chatItem);
  const userId = useSelector((state: RootState) => state.root.userId);
  const isLoading = useSelector(
    (state: RootState) => state.loader.isLoadingMessages
  );

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
              [
                isLoading ? (
                  <ChatContent>
                    <DotLoader size={50} color={"#0176ff"} loading={true} />
                  </ChatContent>
                ) : (
                  <ChatContent>
                    <TextField
                      center
                      type="p"
                      text="You do not have messages yet."
                    />
                  </ChatContent>
                ),
              ]
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
          {chatState.chatType === ChatType.group && (
            <GroupChatDescription
              imageUrl={chatState.chatImage}
              isActive={isActiveDescription}
              onCloseClick={() => setDescriptionStatus(false)}
              groupName={chatState.chatHeader}
              isAdmin={chatState.isAdmin}
            />
          )}
        </div>
      ) : (
        <div className="chat flex-column justify-content-center text-center">
          {/*<!-- Chat: body when chat is not selected -->*/}
          <div className="container-xxl">
            <TextField
              center
              type="p"
              text="Please select a chat to start messaging."
            />
          </div>
        </div>
      )}
    </div>
  );
};
