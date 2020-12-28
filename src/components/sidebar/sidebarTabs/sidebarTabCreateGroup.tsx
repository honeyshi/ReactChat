import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  SidebarSubtabGroupDetails,
  SidebarTab,
  SidebarTitle,
  NavbarItem,
  SidebarSubtabGroupMembers,
} from "components";
import { checkUserHasPrivateChats } from "common/functions";
import { performCreateGroupChatRequest } from "common/requests";
import { RootState } from "store/stores";

enum CreateGroupSubtabs {
  GroupDetails = "create-group-details",
  GroupMembers = "create-group-members",
}

export const SidebarTabCreateGroup: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  const [activeCreateGroupTab, setActiveCreateGroupTab] = useState<string>(
    CreateGroupSubtabs.GroupDetails
  );
  const sidebarState = useSelector((state: RootState) => state.sidebar);
  const userId = useSelector((state: RootState) => state.root.userId);
  return (
    <SidebarTab
      id="tab-content-create-chat"
      isActive={isActive}
      isOuter
      outsideScroll
      buttonDisabled={!checkUserHasPrivateChats(sidebarState.sidebarDialogs)}
      buttonText="Create Group"
      onButtonClick={() =>
        performCreateGroupChatRequest(
          userId,
          sidebarState.groupName,
          sidebarState.groupMembers
        )
      }
    >
      <SidebarTitle text="Create group" />
      <ul className="nav nav-tabs nav-justified mb-6" role="tablist">
        <NavbarItem
          isActive={activeCreateGroupTab?.includes(
            CreateGroupSubtabs.GroupDetails
          )}
          isMenu={false}
          link={CreateGroupSubtabs.GroupDetails}
          text="Details"
          onClick={() =>
            setActiveCreateGroupTab(CreateGroupSubtabs.GroupDetails)
          }
        />
        <NavbarItem
          isActive={activeCreateGroupTab?.includes(
            CreateGroupSubtabs.GroupMembers
          )}
          isMenu={false}
          link={CreateGroupSubtabs.GroupMembers}
          text="Members"
          onClick={() =>
            setActiveCreateGroupTab(CreateGroupSubtabs.GroupMembers)
          }
        />
      </ul>
      <div className="tab-content" role="tablist">
        <SidebarSubtabGroupDetails
          isActive={activeCreateGroupTab?.includes(
            CreateGroupSubtabs.GroupDetails
          )}
        />
        <SidebarSubtabGroupMembers
          isActive={activeCreateGroupTab?.includes(
            CreateGroupSubtabs.GroupMembers
          )}
        />
      </div>
    </SidebarTab>
  );
};
