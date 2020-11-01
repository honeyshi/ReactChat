import React from "react";

// In future get messages and display

export const ChatContent: React.FC = ({ children }) => {
  return (
    <div className="chat-content px-lg-8">
      <div className="container-xxl py-6 py-lg-10">{children}</div>
    </div>
  );
};
