import { createAction } from "@reduxjs/toolkit";
import { ChatActionTypes } from "store/actionTypes";
import { IChat, IUserInfo } from "common/interfaces";

export const setCurrentChat = createAction<IChat>(
  ChatActionTypes.SET_CURRENTCHAT
);
export const setChatMembers = createAction<IUserInfo[]>(
  ChatActionTypes.SET_CHATMEMBERS
);
