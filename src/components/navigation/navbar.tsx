import React, { useMemo, useState } from "react";
import { NavbarItem } from "./navbarItem";
import * as Icon from "react-feather";

interface INavbarItem {
  title: string;
  link: string;
  child: React.FC<Icon.Props>;
}

const navbarItems: INavbarItem[] = [
  {
    title: "Create chat",
    link: "tab-content-create-chat",
    child: Icon.Edit,
  },
  {
    title: "Search user",
    link: "tab-content-search-user",
    child: Icon.Search,
  },
  {
    title: "Blocked users",
    link: "tab-content-blocked-users",
    child: Icon.UserX,
  },
  {
    title: "Chats",
    link: "tab-content-dialogs",
    child: Icon.MessageSquare,
  },
  {
    title: "User",
    link: "tab-content-user",
    child: Icon.User,
  },
];

export const Navbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>();

  const onNavbarItemClick = (item: string) => setActiveItem(item);

  if (activeItem === undefined) setActiveItem("Chats");

  const navbarItemComponents = useMemo(() => {
    const innerNavbar = navbarItems.map((itemInfo) => {
      return (
        <NavbarItem
          isActive={itemInfo.title === activeItem ? true : false}
          isMenu={true}
          link={itemInfo.link}
          title={itemInfo.title}
          onClick={() => onNavbarItemClick(itemInfo.title)}
        >
          {<itemInfo.child />}
        </NavbarItem>
      );
    });
    return innerNavbar;
  }, [activeItem]);

  return (
    <div className="navigation navbar navbar-light justify-content-center py-xl-7">
      {/*<!-- Menu -->*/}
      <ul
        className="nav navbar-nav flex-row flex-xl-column flex-grow-1 justify-content-between justify-content-xl-center py-3 py-lg-0"
        role="tablist"
      >
        {navbarItemComponents}
      </ul>
    </div>
  );
};
