import React from "react";
import { useSelector } from "react-redux";
import {
  SidebarItemsContainer,
  SidebarTab,
  SidebarTitle,
  TextField,
} from "components";
import { RootState } from "store/stores";

export const SidebarTabChats: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  const sidebarDialogs = useSelector(
    (state: RootState) => state.sidebar.sidebarDialogs
  );
  return (
    <SidebarTab id="tab-content-dialogs" isActive={isActive} isOuter>
      <SidebarTitle text="Chats" />
      {sidebarDialogs.length !== 0 ? (
        <SidebarItemsContainer
          classes="nav d-block list-discussions-js mb-n6"
          sidebarChatItems={sidebarDialogs}
        />
      ) : (
        <TextField
          center
          text="You do not have any chats. Search user to start messaging"
          type="p"
        />
      )}
    </SidebarTab>
  );
};
