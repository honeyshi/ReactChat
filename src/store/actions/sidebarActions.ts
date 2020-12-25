import { createAction } from "@reduxjs/toolkit";
import { SidebarActionTypes } from "store/actionTypes";
import { ISidebarChatItem, ISidebarFriendItem } from "common/interfaces";

export const setDialogs = createAction<ISidebarChatItem[]>(
  SidebarActionTypes.SIDEBAR_SETDIALOGS
);
export const setBlockedUsers = createAction<ISidebarFriendItem[]>(
  SidebarActionTypes.SIDEBAR_SETBLOCKEDUSERS
);
export const setFoundUsers = createAction<ISidebarFriendItem[]>(
  SidebarActionTypes.SIDEBAR_SETFOUNDUSERS
);
export const setGroupChatMembers = createAction<string[]>(
  SidebarActionTypes.SET_GROUPCHATMEMBERS
);
export const setGroupChatName = createAction<string>(
  SidebarActionTypes.SET_GROUPCHATNAME
);
export const setGroupChatImage = createAction<Blob>(
  SidebarActionTypes.SET_GROUPCHATIMAGE
);
