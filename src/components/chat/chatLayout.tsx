import React, { useState } from "react";
import { ChatHeader } from "./chatHeader";
import { ChatMessage } from "./chatMessage";
import { ChatFooter } from "./chatFooter";
import { ChatContent } from "./chatContent";
import { ChatDescription } from "./chatDescription";

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
  const [currentChatName, setCurrentChatName] = useState<string>(
    "Anna Bridges"
  );
  const [currentChatStatus, setCurrentChatStatus] = useState<string>("Online");
  const [isActiveDescription, setDescriptionStatus] = useState<boolean>(false);

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
            chatName={currentChatName}
            chatStatus={currentChatStatus}
            onDetailsClick={() => setDescriptionStatus(true)}
          />
          <ChatContent>{chatMessageComponents}</ChatContent>
          <ChatFooter />
        </div>
        <ChatDescription
          avatarUrl="/fakeUrl"
          isActive={isActiveDescription}
          onCloseClick={() => setDescriptionStatus(false)}
          userLogin="Anna Bridges"
          userNote="Test user note"
        />
      </div>
    </div>
  );
};

export default ChatLayout;
