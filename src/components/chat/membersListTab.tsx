import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/stores";
import { SidebarTab, SidebarItem, SidebarFriend } from "../sidebar";

interface IMembersListProps {
  isActive: boolean;
  isAdmin: boolean;
}

export const MembersListTab: React.FC<IMembersListProps> = ({
  isActive,
  isAdmin,
}) => {
  const chatMembers = useSelector((state: RootState) => state.chat.chatMembers);
  const chatMembersItems = chatMembers.map((chatMember, memberIndex) => {
    return (
      <SidebarItem type="div" classes="card" key={`user-${memberIndex}`}>
        <SidebarFriend
          canChoose={false}
          canDelete={isAdmin}
          friendImage={chatMember.userImage}
          friendName={chatMember.userLogin}
          isOnline={false}
          checkboxName={`user-${memberIndex}`}
        />
      </SidebarItem>
    );
  });
  return (
    <SidebarTab id="group-members" isActive={isActive} isOuter={false}>
      <nav className="list-group list-group-flush mb-n6">
        {chatMembersItems}
      </nav>
    </SidebarTab>
  );
};
