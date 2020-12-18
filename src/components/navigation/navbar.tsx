import React, { useMemo, useState } from "react";
import { NavbarItem } from "./navbarItem";
import { setActiveNavbar, setFoundUsers } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import {
  performGetBlockedUsersRequest,
  performGetLastChatsRequest,
  performGetUserInfoRequest,
} from "../../common/requests";
import { RootState } from "../../store/stores";

interface INavbarItem {
  title: string;
  link: string;
  child: React.FC<Icon.Props>;
  clickVoid: (arg0: string) => void;
}

const navbarItems: INavbarItem[] = [
  {
    title: "Create chat",
    link: "tab-content-create-chat",
    child: Icon.Edit,
    clickVoid: () => void 0,
  },
  {
    title: "Search user",
    link: "tab-content-search-users",
    child: Icon.Search,
    clickVoid: () => void 0,
  },
  {
    title: "Blocked users",
    link: "tab-content-blocked-users",
    child: Icon.UserX,
    clickVoid: performGetBlockedUsersRequest,
  },
  {
    title: "Chats",
    link: "tab-content-dialogs",
    child: Icon.MessageSquare,
    clickVoid: performGetLastChatsRequest,
  },
  {
    title: "User",
    link: "tab-content-user",
    child: Icon.User,
    clickVoid: performGetUserInfoRequest,
  },
];

export const Navbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("tab-content-dialogs");
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.root.userId);

  const onNavbarItemClick = (item: string) => {
    console.log(`Click on ${item}`);
    setActiveItem(item);
    dispatch(setActiveNavbar(item));
  };

  const navbarItemComponents = useMemo(() => {
    const innerNavbar = navbarItems.map((itemInfo) => {
      return (
        <NavbarItem
          isActive={itemInfo.link === activeItem ? true : false}
          isMenu={true}
          link={itemInfo.link}
          title={itemInfo.title}
          onClick={() => {
            onNavbarItemClick(itemInfo.link);
            itemInfo.clickVoid(userId);
            if (itemInfo.link == "tab-content-search-users")
              dispatch(setFoundUsers([]));
          }}
          key={itemInfo.link}
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
