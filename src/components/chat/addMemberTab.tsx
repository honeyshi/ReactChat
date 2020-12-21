import React from "react";
import { useSelector } from "react-redux";
import { ChatType } from "../../common/variables";
import { RootState } from "../../store/stores";
import { Button, TextField } from "../base";
import { SidebarTab, SidebarItem, SidebarFriend } from "../sidebar";

export const AddMemberTab: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const privateChats = useSelector(
    (state: RootState) => state.sidebar.sidebarDialogs
  ).filter((dialog) => dialog.chatType === ChatType.private);
  const chatMembers = useSelector(
    (state: RootState) => state.chat.chatMembers
  ).map((member) => {
    return member.userLogin;
  });
  const extraChatMembers = privateChats.filter(
    (member) => !chatMembers.includes(member.chatHeader)
  );
  const extraChatMembersItems = extraChatMembers.map(
    (chatMember, memberIndex) => {
      return (
        <SidebarItem type="div" classes="card" key={`user-${memberIndex}`}>
          <SidebarFriend
            canChoose={true}
            canDelete={false}
            friendImage={chatMember.chatImage}
            friendName={chatMember.chatHeader}
            isOnline={false}
            checkboxName={`user-${memberIndex}`}
          />
        </SidebarItem>
      );
    }
  );
  return (
    <SidebarTab id="group-members" isActive={isActive} isOuter={false}>
      <nav className="list-group list-group-flush mb-n6">
        {extraChatMembersItems.length !== 0 ? (
          <>
            {extraChatMembersItems}
            <Button long primary text="Save selection" />
          </>
        ) : (
          <TextField
            center
            type="p"
            text="You can not add more users to this chat."
            pt="6"
          />
        )}
      </nav>
    </SidebarTab>
  );
};
