import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Send } from "react-feather";
import { Button, Input } from "components";
import {
  performCreatePrivateChatRequest,
  performSendMessageRequest,
} from "common/requests";
import { RootState } from "store/stores";
import { ChatType } from "common/variables";

export const ChatFooter: React.FC = () => {
  const chatState = useSelector((state: RootState) => state.chat.chatItem);
  const userId = useSelector((state: RootState) => state.root.userId);
  const [message, setMessage] = useState<string>("");
  return (
    <div className="chat-footer border-top py-4 py-lg-6 px-lg-8">
      <div className="container-xxl">
        <form id="chat-id-2-form">
          <div className="form-row align-items-center">
            <div className="col">
              <div className="input-group">
                {/*<!-- Textarea -->*/}
                <Input
                  type="textarea"
                  placeholder="Type your message..."
                  classes="form-control bg-transparent border-0"
                  id="chat-input"
                  value={message}
                  onChange={(message) => setMessage(message)}
                />
              </div>
            </div>
            <div className="col-auto">
              <Button
                primary
                shapeType="rounded-circle"
                onClick={() => {
                  chatState.chatMessages.length === 0 &&
                  chatState.chatType === ChatType.private
                    ? performCreatePrivateChatRequest(
                        userId,
                        chatState.chatHeader,
                        message
                      )
                    : performSendMessageRequest(
                        userId,
                        chatState.chatId,
                        message
                      );
                  setMessage("");
                }}
              >
                {<Send size={19} />}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
