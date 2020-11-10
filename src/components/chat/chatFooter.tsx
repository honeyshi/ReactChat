import React from "react";
import { Button } from "../base";
import { Send } from "react-feather";

export const ChatFooter: React.FC = () => {
  return (
    <div className="chat-footer border-top py-4 py-lg-6 px-lg-8">
      <div className="container-xxl">
        <form id="chat-id-2-form">
          <div className="form-row align-items-center">
            <div className="col">
              <div className="input-group">
                {/*<!-- Textarea -->*/}
                <textarea
                  id="chat-id-2-input"
                  className="form-control bg-transparent border-0"
                  placeholder="Type your message..."
                  data-autosize="true"
                />
              </div>
            </div>
            <div className="col-auto">
              <Button isPrimary={true} shapeType="rounded-circle">
                {<Send size={19} />}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
