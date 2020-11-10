import * as Icon from "react-feather";
import React from "react";

export interface ISidebarChatItem {
  chatHeader: string;
  chatImage: string;
  countUnreadMessages: number;
  isOnline: boolean;
  lastMessageAuthor?: string;
  lastMessageText: string;
  lastMessageTime: string;
}

export interface ISidebarFriendItem {
  canDelete: boolean;
  friendImage: string;
  friendName: string;
  friendStatus: string;
  isOnline: boolean;
}

export interface ISidebarUserInfoItem {
  itemHeader: string;
  itemValue: string;
  icon: React.FC<Icon.Props>;
}

export interface ISidebarUserProfileProps {
  userDescription: string;
  userImage: string;
  userName: string;
}
