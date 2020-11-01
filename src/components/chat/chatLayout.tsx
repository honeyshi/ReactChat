import React, { useState } from "react";
import { ChatHeader } from "./chatHeader";
import { ChatMessage } from "./chatMessage";
import { ChatFooter } from "./chatFooter";
import { ChatContent } from "./chatContent";

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
    userImage: "/fake-link"
  },
  {
    isRight: true,
    messageText:
      "Yeah, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents",
    messageTime: "2 minutes ago"
  }
];

export const ChatLayout: React.FC = () => {
  const [currentChatName, setCurrentChatName] = useState<string>();
  const [currentChatStatus, setCurrentChatStatus] = useState<string>();

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

  if (currentChatName === undefined) setCurrentChatName("Anna Bridges");
  if (currentChatStatus === undefined) setCurrentChatStatus("Online");

  return (
    <div className="main main-visible">
      {/*<!-- Chat -->*/}
      <div className="chat dropzone-form-js">
        {/*<!-- Chat: body -->*/}
        <div className="chat-body">
          <ChatHeader
            chatName={currentChatName}
            chatStatus={currentChatStatus}
          />
          <ChatContent>{chatMessageComponents}</ChatContent>
          <ChatFooter />
        </div>
      </div>
    </div>
  );
};
