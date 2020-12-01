import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChatHeader } from "./chatHeader";
import { ChatMessage } from "./chatMessage";
import { ChatFooter } from "./chatFooter";
import { ChatContent } from "./chatContent";
import { ChatDescription } from "./chatDescription";
import { RootState } from "../../store/stores";

import "../layout.scss";

interface IChatMessageItem {
  isRight: boolean;
  messageText: string;
  messageTime: string;
  senderName?: string;
  userImage?: string;
}

const chatMessageItems: IChatMessageItem[] = [
  { isRight: true, messageText: "Hello!", messageTime: "10:15 AM" },
  {
    isRight: false,
    messageText:
      "I'm going to meet a friend of mine at the department store. Yeah, I have to buy some presents for my parents.",
    messageTime: "6 minutes ago",
    senderName: "Anna Bridges",
    userImage: "/fake-link",
  },
  {
    isRight: true,
    messageText:
      "Yeah, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents",
    messageTime: "2 minutes ago",
  },
];

const ChatLayout: React.FC = () => {
  const [isActiveDescription, setDescriptionStatus] = useState<boolean>(false);
  const chatState = useSelector((state: RootState) => state.chat.chatItem);
  const privateChatType = 0;

  const chatMessageComponents = chatMessageItems.map((chatMessageInfo) => {
    return (
      <ChatMessage
        isRight={chatMessageInfo.isRight}
        messageText={chatMessageInfo.messageText}
        messageTime={chatMessageInfo.messageTime}
        senderName={chatMessageInfo.senderName}
        userImage={chatMessageInfo.userImage}
      />
    );
  });

  return (
    <div className="main main-visible">
      {/*<!-- Chat -->*/}
      <div className="chat dropzone-form-js">
        {/*<!-- Chat: body -->*/}
        <div className="chat-body">
          <ChatHeader
            chatImage={chatState.chatImage}
            chatName={chatState.chatHeader}
            chatStatus={
              chatState.chatType === privateChatType ? chatState.isOnline : ""
            }
            onDetailsClick={() => setDescriptionStatus(true)}
          />
          <ChatContent>{chatMessageComponents}</ChatContent>
          <ChatFooter />
        </div>
        {chatState.chatType === privateChatType && (
          <ChatDescription
            avatarUrl={chatState.chatImage}
            isActive={isActiveDescription}
            onCloseClick={() => setDescriptionStatus(false)}
            userLogin={chatState.chatHeader}
            userNote="Test user note"
          />
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
