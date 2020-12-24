import React from "react";
import { NotificationContainer } from "react-notifications";
import { Sidebar, ChatLayout, Navbar } from "components";

export const ChatPage: React.FC = () => {
  return (
    <>
      <Navbar /> <Sidebar /> <ChatLayout /> <NotificationContainer />
    </>
  );
};
