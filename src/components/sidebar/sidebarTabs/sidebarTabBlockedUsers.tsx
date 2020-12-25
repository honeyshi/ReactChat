import React from "react";
import { useSelector } from "react-redux";
import DotLoader from "react-spinners/DotLoader";
import {
  SidebarItemsContainer,
  SidebarTab,
  SidebarTitle,
  TextField,
} from "components";
import { RootState } from "store/stores";

export const SidebarTabBlockedUsers: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  const sidebarBlockedUsers = useSelector(
    (state: RootState) => state.sidebar.sidebarBlockedUsers
  );
  const isLoading = useSelector(
    (state: RootState) => state.loader.isLoadingBlocked
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
        [
          isLoading ? (
            <DotLoader size={50} color={"#0176ff"} loading={true} />
          ) : (
            <TextField center text="You do not have blocked users" type="p" />
          ),
        ]
      )}
    </SidebarTab>
  );
};
