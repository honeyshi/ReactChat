import React from "react";
import Sidebar from "../sidebar/sidebar";
import ChatLayout from "../chat/chatLayout";
import { Navbar } from "../navigation";
import { NotificationContainer } from "react-notifications";

export const ChatPage: React.FC = () => {
  return (
    <>
      <Navbar /> <Sidebar /> <ChatLayout /> <NotificationContainer />
    </>
  );
};
