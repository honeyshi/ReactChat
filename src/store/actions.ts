import { createAction } from "@reduxjs/toolkit";
import {
  IChat,
  ISidebarChatItem,
  ISidebarFriendItem,
} from "../common/interfaces";
import { ActionTypes } from "./actionTypes";

export const setEmail = createAction<string>(ActionTypes.COMMON_SETEMAIL);
export const setLogin = createAction<string>(ActionTypes.COMMON_SETLOGIN);
export const setPassword = createAction<string>(ActionTypes.COMMON_SETPASSWORD);
export const confirmPassword = createAction<string>(
  ActionTypes.COMMON_CONFIRMPASSWORD
);
export const setIsAuth = createAction<boolean>(ActionTypes.COMMON_SET_ISAUTH);
export const setUserId = createAction<string>(ActionTypes.COMMON_SET_USERID);
export const setErrorMessage = createAction<string>(
  ActionTypes.COMMON_SET_ERRORMESSAGE
);
export const setResetState = createAction<boolean>(
  ActionTypes.COMMON_SET_ISRESET
);
export const setActiveNavbar = createAction<string>(
  ActionTypes.COMMON_SET_ACTIVENAVBAR
);

export const setDialogs = createAction<ISidebarChatItem[]>(
  ActionTypes.SIDEBAR_SETDIALOGS
);
export const setBlockedUsers = createAction<ISidebarFriendItem[]>(
  ActionTypes.SIDEBAR_SETBLOCKEDUSERS
);
export const setFoundUsers = createAction<ISidebarFriendItem[]>(
  ActionTypes.SIDEBAR_SETFOUNDUSERS
);

export const setCurrentChat = createAction<IChat>(ActionTypes.SET_CURRENTCHAT);

export const setGroupChatName = createAction<string>(
  ActionTypes.SET_GROUPCHATNAME
);
export const setGroupChatMembers = createAction<string[]>(
  ActionTypes.SET_GROUPCHATMEMBERS
);
export const setGroupChatImage = createAction<Blob>(ActionTypes.SET_GROUPCHATIMAGE);
