import React from "react";
import { useSelector } from "react-redux";
import { performAddUsersInGroupRequest } from "common/requests";
import { ChatType } from "common/variables";
import { RootState } from "store/stores";
import {
  Button,
  TextField,
  SidebarTab,
  SidebarItem,
  SidebarFriend,
} from "components";

export const AddMemberTab: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const groupMembers = useSelector(
    (state: RootState) => state.sidebar.groupMembers
  );
  const chatId = useSelector((state: RootState) => state.chat.chatItem.chatId);
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
        <SidebarItem
          type="div"
          classes="card"
          key={`group-member-${memberIndex}`}
        >
          <SidebarFriend
            canChoose={true}
            canDelete={false}
            friendImage={chatMember.chatImage}
            friendName={chatMember.chatHeader}
            isGroupMember={false}
            isOnline={false}
            checkboxName={`group-member-${memberIndex}`}
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
            <Button
              long
              primary
              m="3"
              text="Save selection"
              onClick={() =>
                performAddUsersInGroupRequest(groupMembers, chatId)
              }
            />
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
