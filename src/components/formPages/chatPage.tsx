import React from "react";
import Sidebar from "../sidebar/sidebar";
import ChatLayout from "../chat/chatLayout";
import { Navbar } from "../navigation";

export const ChatPage: React.FC = () => {
  return (
    <>
      <Navbar /> <Sidebar /> <ChatLayout />
    </>
  );
};
