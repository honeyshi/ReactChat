import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit, Search, UserX, MessageSquare, User, Props } from "react-feather";
import { NavbarItem } from "components";
import {
  performGetBlockedUsersRequest,
  performGetLastChatsRequest,
  performGetUserInfoRequest,
} from "common/requests";
import { RootState } from "store/stores";
import { setActiveNavbar, setFoundUsers } from "store/actions";

interface INavbarItem {
  title: string;
  link: string;
  child: React.FC<Props>;
  clickVoid: (arg0: string) => void;
}

const navbarItems: INavbarItem[] = [
  {
    title: "Create chat",
    link: "tab-content-create-chat",
    child: Edit,
    clickVoid: () => void 0,
  },
  {
    title: "Search user",
    link: "tab-content-search-users",
    child: Search,
    clickVoid: () => void 0,
  },
  {
    title: "Blocked users",
    link: "tab-content-blocked-users",
    child: UserX,
    clickVoid: performGetBlockedUsersRequest,
  },
  {
    title: "Chats",
    link: "tab-content-dialogs",
    child: MessageSquare,
    clickVoid: performGetLastChatsRequest,
  },
  {
    title: "User",
    link: "tab-content-user",
    child: User,
    clickVoid: performGetUserInfoRequest,
  },
];

export const Navbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("tab-content-dialogs");
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.root.userId);

  const onNavbarItemClick = (item: string) => {
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
