import React from "react";
import {
  ISidebarChatItem,
  ISidebarFriendItem,
  ISidebarUserInfoItem,
  ISidebarUserProfileProps,
} from "../../common/interfaces";
import { SidebarChat } from "./sidebarChat";
import { SidebarChatContainer } from "./sidebarChatContainer";
import { SidebarItem } from "./sidebarItem";
import { SidebarFriend } from "./sidebarFriend";
import { SidebarMessagesCount } from "./sidebarMessagesCount";
import { SidebarUserProfileInfo } from "./sidebarUserProfileInfo";
import { SidebarUserProfile } from "./sidebarUserProfile";

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
    sidebarItems = sidebarChatItems.map((sidebarChatItemInfo) => {
      return (
        <SidebarItem type="a" classes="text-reset nav-link p-0 mb-6">
          <SidebarChatContainer>
            <SidebarChat
              chatHeader={sidebarChatItemInfo.chatHeader}
              chatImage={sidebarChatItemInfo.chatImage}
              lastMessageText={sidebarChatItemInfo.lastMessageText}
              lastMessageAuthor={sidebarChatItemInfo.lastMessageAuthor}
              lastMessageTime={sidebarChatItemInfo.lastMessageTime}
            />
            {sidebarChatItemInfo.isUnread && <SidebarMessagesCount />}
          </SidebarChatContainer>
        </SidebarItem>
      );
    });
  }

  if (sidebarFriendItems !== undefined) {
    sidebarItems = sidebarFriendItems.map((sidebarFriendItemInfo) => {
      return (
        <SidebarItem type="div" classes="card mb-6">
          <SidebarFriend
            canChoose={false}
            canDelete={sidebarFriendItemInfo.canDelete}
            friendImage={sidebarFriendItemInfo.friendImage}
            friendName={sidebarFriendItemInfo.friendName}
            isOnline={sidebarFriendItemInfo.isOnline}
          />
        </SidebarItem>
      );
    });
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
        return (
          <SidebarItem type="div" classes="card mb-6">
            <SidebarFriend
              canChoose={true}
              canDelete={false}
              friendImage={sidebarGroupMemberInfo.chatImage}
              friendName={sidebarGroupMemberInfo.chatHeader}
              isOnline={false}
              checkboxName={`user-${userIndex}`}
            />
          </SidebarItem>
        );
      }
    );
  }

  return <nav className={classes}>{sidebarItems}</nav>;
};
