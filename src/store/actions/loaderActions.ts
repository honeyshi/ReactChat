import { createAction } from "@reduxjs/toolkit";
import { LoaderActionTypes } from "store/actionTypes";

export const setLoadChats = createAction<boolean>(LoaderActionTypes.LOAD_CHATS);
export const setLoadMessages = createAction<boolean>(
  LoaderActionTypes.LOAD_MESSAGES
);
export const setLoadSearch = createAction<boolean>(
  LoaderActionTypes.LOAD_SEARCH
);
export const setLoadBlocked = createAction<boolean>(
  LoaderActionTypes.LOAD_BLOCKED
);
