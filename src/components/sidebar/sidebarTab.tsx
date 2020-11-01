import React from "react";
import classNames from "classnames";

interface ISidebarTabProps {
  id: string;
  isActive: boolean;
  isOuter: boolean;
}

export const SidebarTab: React.FC<ISidebarTabProps> = ({
  id,
  isActive,
  isOuter,
  children
}) => {
  return (
    <div
      className={classNames(
        "tab-pane fade",
        { active: isActive },
        { show: isActive },
        { "h-100": isOuter }
      )}
      id={id}
      role="tabpanel"
    >
      {isOuter ? (
        <div className="d-flex flex-column h-100">
          <div className="hide-scrollbar">
            <div className="container-fluid py-6">{children}</div>
          </div>
        </div>
      ) : (
        <form action="#">{children}</form>
      )}
    </div>
  );
};
