import React from "react";

interface IChatHeaderProps {
  chatImage?: string;
  chatName: string | undefined;
  chatStatus: string | undefined;
}

export const ChatHeader: React.FC<IChatHeaderProps> = ({
  chatImage,
  chatName,
  chatStatus
}) => {
  return (
    <div className="chat-header border-bottom py-4 py-lg-6 px-lg-8">
      <div className="container-xxl">
        <div className="row align-items-center">
          {/* Chat photo */}
          <div className="col-6 col-xl-6">
            <div className="media text-center text-xl-left">
              <div className="avatar avatar-sm avatar-online d-none d-lg-inline-block mr-5">
                <img src={chatImage} className="avatar-img" alt=""></img>
              </div>
              {/*Chat information*/}
              <div className="media-body align-self-center text-truncate">
                <h6 className="text-truncate mb-n1">{chatName}</h6>
                <span className="badge badge-dot badge-success d-inline-block d-xl-none mr-1"></span>
                <small className="text-muted">{chatStatus}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
