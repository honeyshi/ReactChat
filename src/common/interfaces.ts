import * as Icon from "react-feather";
import React from "react";

export interface ISidebarChatItem {
  chatHeader: string;
  chatImage: string;
  chatId: number;
  chatType: number;
  isUnread: boolean;
  lastMessageAuthor?: string;
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
  itemValue: string;
  icon: React.FC<Icon.Props>;
}

export interface ISidebarUserProfileProps {
  userDescription: string;
  userImage: string;
  userName: string;
}

export interface IChatMessageItem {
  isRight: boolean;
  messageText: string;
  messageTime: string;
  senderName?: string;
  userImage?: string;
}

export interface IChat {
  chatHeader: string;
  chatImage: string;
  chatType: number;
  isOnline?: string;
  chatMessages: IChatMessageItem[];
}
