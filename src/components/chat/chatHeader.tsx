import React from "react";
import { MoreVertical } from "react-feather";
import { Avatar, TextField } from "components";

interface IChatHeaderProps {
  chatImage: string;
  chatName: string | undefined;
  chatStatus: string | undefined;
  onDetailsClick: () => void;
}

export const ChatHeader: React.FC<IChatHeaderProps> = ({
  chatImage,
  chatName,
  chatStatus,
  onDetailsClick,
}) => {
  return (
    <div className="chat-header border-bottom py-4 py-lg-6 px-lg-8">
      <div className="container-xxl">
        <div className="row align-items-center">
          {/* Chat photo */}
          <div className="col-6 col-xl-6">
            <div className="media text-center text-xl-left">
              <Avatar
                small
                displayNone
                inlineBlock
                mr="5"
                isOnline={chatStatus === "Online"}
                imagePath={chatImage}
              />
              {/*Chat information*/}
              <div className="media-body align-self-center text-truncate">
                <TextField classes="mb-n1" type="h6" text={chatName} truncate />
                <TextField type="small" text={chatStatus} muted />
              </div>
            </div>
          </div>
          <div className="col-3 col-xl-6 text-right">
            <ul className="nav justify-content-end">
              <li className="nav-item list-inline-item d-none d-xl-block mr-0">
                <a
                  className="nav-link text-muted px-3"
                  title="Details"
                  onClick={onDetailsClick}
                >
                  <MoreVertical size={19} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
