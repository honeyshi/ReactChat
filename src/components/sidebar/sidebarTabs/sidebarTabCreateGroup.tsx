import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SidebarSubtabGroupDetails } from ".";
import { SidebarTab, SidebarTitle } from "..";
import { checkUserHasPrivateChats } from "../../../common/functions";
import { RootState } from "../../../store/stores";
import { NavbarItem } from "../../navigation";
import { SidebarSubtabGroupMembers } from "./sidebarSubtabGroupMembers";

enum CreateGroupSubtabs {
  GroupDetails = "create-group-details",
  GroupMembers = "create-group-members",
}

export const SidebarTabCreateGroup: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  const sidebarDialogs = useSelector(
    (state: RootState) => state.sidebar.sidebarDialogs
  );
  const [activeCreateGroupTab, setActiveCreateGroupTab] = useState<string>(
    CreateGroupSubtabs.GroupDetails
  );
  return (
    <SidebarTab
      id="tab-content-create-chat"
      isActive={isActive}
      isOuter={true}
      outsideScroll={true}
      buttonClasses="btn-lg btn-block"
      buttonDisabled={!checkUserHasPrivateChats(sidebarDialogs)}
      buttonText="Create Group"
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
