import React from "react";
import classNames from "classnames";
import { Button } from "../base/button";

interface ISidebarTabProps {
  id: string;
  isActive?: boolean;
  isOuter: boolean;
  outsideScroll?: boolean;
  buttonClasses?: string;
  buttonDisabled?: boolean;
  buttonText?: string;
}

export const SidebarTab: React.FC<ISidebarTabProps> = ({
  id,
  isActive,
  isOuter,
  outsideScroll,
  buttonClasses,
  buttonDisabled,
  buttonText,
  children,
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
          {outsideScroll && (
            <div className="pb-6">
              <div className="container-fluid">
                <Button
                  isPrimary={true}
                  classes={buttonClasses}
                  text={buttonText}
                  disabled={buttonDisabled}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <form action="#">{children}</form>
      )}
    </div>
  );
};
