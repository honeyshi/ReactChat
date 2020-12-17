import React from "react";
import { useSelector } from "react-redux";
import { SidebarItemsContainer, SidebarTab, SidebarTitle } from "..";
import { RootState } from "../../../store/stores";
import { TextField } from "../../base";

export const SidebarTabBlockedUsers: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  const sidebarBlockedUsers = useSelector(
    (state: RootState) => state.sidebar.sidebarBlockedUsers
  );
  return (
    <SidebarTab id="tab-content-blocked-users" isActive={isActive} isOuter>
      <SidebarTitle text="Blocked users" />
      {sidebarBlockedUsers.length !== 0 ? (
        <SidebarItemsContainer
          classes="mb-n6"
          sidebarFriendItems={sidebarBlockedUsers}
        />
      ) : (
        <TextField center text="You do not have blocked users" type="p" />
      )}
    </SidebarTab>
  );
};
