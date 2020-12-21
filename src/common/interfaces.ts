import * as Icon from "react-feather";
import React from "react";

export interface ISidebarChatItem {
  chatHeader: string;
  chatImage: string;
  chatId: string;
  chatType: number;
  isAdmin: boolean;
  isUnread: boolean;
  isUserOnline: boolean;
  lastMessageText: string;
  lastMessageTime: string;
}

export interface ISidebarFriendItem {
  canDelete: boolean;
  friendImage: string;
  friendName: string;
  isOnline: boolean;
}

export interface ISidebarUserInfoItem {
  itemHeader: string;
  itemValue?: string;
  icon: React.FC<Icon.Props>;
}

export interface ISidebarUserProfileProps {
  userDescription: string;
  userImage: string;
  userName: string;
}

export interface IChatMessageItem {
  isRight: boolean;
  messageId: string;
  messageText: string;
  messageTime: string;
  senderName?: string;
  userImage: string;
}

export interface IChat {
  chatHeader: string;
  chatId: string;
  chatImage: string;
  chatType: number;
  isAdmin: boolean;
  isOnline?: string;
  chatMessages: IChatMessageItem[];
  userNote: string;
}

export interface IUserInfo {
  userEmail?: string;
  userImage: string;
  userLogin: string;
}
