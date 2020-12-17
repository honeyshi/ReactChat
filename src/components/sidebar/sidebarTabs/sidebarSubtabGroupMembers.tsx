import React from "react";
import { useSelector } from "react-redux";
import { SidebarItemsContainer, SidebarTab } from "..";
import { checkUserHasPrivateChats } from "../../../common/functions";
import { RootState } from "../../../store/stores";
import { TextField } from "../../base";

export const SidebarSubtabGroupMembers: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  const sidebarDialogs = useSelector(
    (state: RootState) => state.sidebar.sidebarDialogs
  );
  return (
    <SidebarTab id="create-group-members" isActive={isActive} isOuter={false}>
      {checkUserHasPrivateChats(sidebarDialogs) ? (
        <SidebarItemsContainer
          classes="list-group list-group-flush mb-n6"
          sidebarGroupMembersItems={sidebarDialogs}
        />
      ) : (
        <TextField
          center
          text="You do not have any private conversations with users. Search user to start messaging"
          type="p"
        />
      )}
    </SidebarTab>
  );
};
