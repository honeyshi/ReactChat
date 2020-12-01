import React from "react";
import classNames from "classnames";
import { MoreVertical } from "react-feather";

interface IChatHeaderProps {
  chatImage?: string;
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
              <div
                className={classNames(
                  "avatar avatar-sm d-none d-lg-inline-block mr-5",
                  { "avatar-online": chatStatus === "Online" }
                )}
              >
                <img src={chatImage} className="avatar-img" alt="" />
              </div>
              {/*Chat information*/}
              <div className="media-body align-self-center text-truncate">
                <h6 className="text-truncate mb-n1">{chatName}</h6>
                <span className="badge badge-dot badge-success d-inline-block d-xl-none mr-1" />
                <small className="text-muted">{chatStatus}</small>
              </div>
            </div>
          </div>
          {chatStatus !== "" && (
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
          )}
        </div>
      </div>
    </div>
  );
};
