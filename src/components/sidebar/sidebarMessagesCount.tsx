import React from "react";

import "./badge.scss";

interface ISidebarMessagesCountProps {
  numberMessages: number;
}

export const SidebarMessagesCount: React.FC<ISidebarMessagesCountProps> = ({
  numberMessages
}) => {
  return (
    <div className="badge badge-circle badge-primary badge-border-light badge-top-right">
      <span>{numberMessages}</span>
    </div>
  );
};
