import React from "react";
import classNames from "classnames";

import "./navbarItem.scss";

interface INavbarItemProps {
  isActive?: boolean;
  isMenu: boolean;
  link: string;
  title?: string;
  text?: string;
  onClick?: (arg0: string) => void;
}

export const NavbarItem: React.FC<INavbarItemProps> = ({
  isActive,
  isMenu,
  link,
  title,
  text,
  onClick,
  children
}) => {
  return (
    <li className={classNames("nav-item", { "mt-xl-9": isMenu })}>
      <a
        className={classNames(
          "nav-link",
          { "position-relative p-0 py-xl-3": isMenu },
          { active: isActive }
        )}
        data-toggle="tab"
        href={`#${link}`}
        title={title}
        role="tab"
        aria-selected={isActive}
        onClick={() => onClick}
      >
        {text}
        {children}
      </a>
    </li>
  );
};
