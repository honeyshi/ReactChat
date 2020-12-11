import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/stores";
import {
  SidebarTabBlockedUsers,
  SidebarTabChats,
  SidebarTabCreateGroup,
  SidebarTabSearch,
  SidebarTabUserProfile,
} from "./sidebarTabs";

import "./sidebar.scss";

export const Sidebar: React.FC = () => {
  const activeNavbar = useSelector(
    (state: RootState) => state.root.activeNavbar
  );
  return (
    <div className="sidebar">
      <div className="tab-content h-100" role="tablist">
        <SidebarTabChats
          isActive={activeNavbar.includes("tab-content-dialogs")}
        />

        <SidebarTabSearch
          isActive={activeNavbar.includes("tab-content-search-users")}
        />

        <SidebarTabBlockedUsers
          isActive={activeNavbar.includes("tab-content-blocked-users")}
        />

        <SidebarTabUserProfile
          isActive={activeNavbar.includes("tab-content-user")}
        />

        <SidebarTabCreateGroup
          isActive={activeNavbar.includes("tab-content-create-chat")}
        />
      </div>
    </div>
  );
};
