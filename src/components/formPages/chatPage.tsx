import React, { useEffect } from "react";
import { NotificationContainer } from "react-notifications";
import { Sidebar, ChatLayout, Navbar } from "components";
import { updateChatState } from "common/requests";

export const ChatPage: React.FC = () => {
  let interval = null;
  useEffect(() => {
    interval = setInterval(updateChatState, 40000);
    updateChatState();
  }, []);
  return (
    <>
      <Navbar /> <Sidebar /> <ChatLayout /> <NotificationContainer />
    </>
  );
};
