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

export const SidebarTabChats: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  const sidebarDialogs = useSelector(
    (state: RootState) => state.sidebar.sidebarDialogs
  );
  const isLoading = useSelector(
    (state: RootState) => state.loader.isLoadingChats
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
        [
          isLoading ? (
            <DotLoader size={50} color={"#0176ff"} loading={true} />
          ) : (
            <TextField
              center
              text="You do not have any chats. Search user to start messaging"
              type="p"
            />
          ),
        ]
      )}
    </SidebarTab>
  );
};
