import React from "react";
import {
  ISidebarChatItem,
  ISidebarFriendItem,
  ISidebarUserInfoItem,
  ISidebarUserProfileProps,
} from "common/interfaces";
import {
  SidebarChat,
  SidebarChatContainer,
  SidebarItem,
  SidebarFriend,
  SidebarMessagesCount,
  SidebarUserProfileInfo,
  SidebarUserProfile,
} from "components";
import { ChatType } from "common/variables";

interface ISidebarItemsProps {
  classes: string;
  sidebarChatItems?: ISidebarChatItem[];
  sidebarFriendItems?: ISidebarFriendItem[];
  sidebarUserInfoItems?: ISidebarUserInfoItem[];
  sidebarUserInfo?: ISidebarUserProfileProps;
  sidebarGroupMembersItems?: ISidebarChatItem[];
}

export const SidebarItemsContainer: React.FC<ISidebarItemsProps> = ({
  classes,
  sidebarChatItems,
  sidebarFriendItems,
  sidebarUserInfoItems,
  sidebarUserInfo,
  sidebarGroupMembersItems,
}) => {
  let sidebarItems;

  if (sidebarChatItems !== undefined) {
    sidebarItems = sidebarChatItems.map((sidebarChatItemInfo, chatIndex) => {
      return (
        <SidebarItem
          type="a"
          classes="text-reset nav-link p-0 mb-6"
          key={`chat-${chatIndex}`}
        >
          <SidebarChatContainer>
            <SidebarChat
              chatHeader={sidebarChatItemInfo.chatHeader}
              chatId={sidebarChatItemInfo.chatId}
              chatImage={sidebarChatItemInfo.chatImage}
              chatType={sidebarChatItemInfo.chatType}
              isUserAdmin={sidebarChatItemInfo.isAdmin}
              isUserOnline={sidebarChatItemInfo.isUserOnline}
              lastMessageText={sidebarChatItemInfo.lastMessageText}
              lastMessageTime={sidebarChatItemInfo.lastMessageTime}
            />
            {sidebarChatItemInfo.isUnread && <SidebarMessagesCount />}
          </SidebarChatContainer>
        </SidebarItem>
      );
    });
  }

  if (sidebarFriendItems !== undefined) {
    sidebarItems = sidebarFriendItems.map(
      (sidebarFriendItemInfo, userIndex) => {
        return (
          <SidebarItem
            type="div"
            classes="card mb-6"
            key={`search-user-${userIndex}`}
          >
            <SidebarFriend
              canChoose={false}
              canDelete={sidebarFriendItemInfo.canDelete}
              friendImage={sidebarFriendItemInfo.friendImage}
              friendName={sidebarFriendItemInfo.friendName}
              isGroupMember={false}
              isOnline={sidebarFriendItemInfo.isOnline}
            />
          </SidebarItem>
        );
      }
    );
  }

  if (sidebarUserInfoItems !== undefined)
    sidebarItems = <SidebarUserProfileInfo infoItems={sidebarUserInfoItems} />;

  if (sidebarUserInfo !== undefined)
    sidebarItems = (
      <SidebarUserProfile
        userDescription={sidebarUserInfo.userDescription}
        userName={sidebarUserInfo.userName}
        userImage={sidebarUserInfo.userImage}
      />
    );

  if (sidebarGroupMembersItems !== undefined) {
    sidebarItems = sidebarGroupMembersItems.map(
      (sidebarGroupMemberInfo, userIndex) => {
        if (sidebarGroupMemberInfo.chatType === ChatType.private) {
          return (
            <SidebarItem
              type="div"
              classes="card mb-6"
              key={`user-${userIndex}`}
            >
              <SidebarFriend
                canChoose={true}
                canDelete={false}
                friendImage={sidebarGroupMemberInfo.chatImage}
                friendName={sidebarGroupMemberInfo.chatHeader}
                isGroupMember={false}
                isOnline={false}
                checkboxName={`user-${userIndex}`}
              />
            </SidebarItem>
          );
        }
      }
    );
  }

  return <nav className={classes}>{sidebarItems}</nav>;
};
