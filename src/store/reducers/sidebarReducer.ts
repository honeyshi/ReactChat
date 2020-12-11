import { createReducer } from "@reduxjs/toolkit";
import { ISidebarChatItem, ISidebarFriendItem } from "../../common/interfaces";
import * as Action from "../actions";

interface ISidebarState {
  sidebarDialogs: ISidebarChatItem[];
  sidebarBlockedUsers: ISidebarFriendItem[];
  sidebarFoundUsers: ISidebarFriendItem[];
}

const sidebarState: ISidebarState = {
  sidebarDialogs: [],
  sidebarBlockedUsers: [],
  sidebarFoundUsers: [],
};

export const sidebarReducer = createReducer(sidebarState, {
  [Action.setDialogs.type]: (state, action) => {
    return {
      ...state,
      sidebarDialogs: action.payload,
    };
  },
  [Action.setBlockedUsers.type]: (state, action) => {
    return {
      ...state,
      sidebarBlockedUsers: action.payload,
    };
  },
  [Action.setFoundUsers.type]: (state, action) => {
    return {
      ...state,
      sidebarFoundUsers: action.payload,
    };
  },
});
