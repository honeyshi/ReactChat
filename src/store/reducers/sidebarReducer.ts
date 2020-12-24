import { createReducer } from "@reduxjs/toolkit";
import { ISidebarChatItem, ISidebarFriendItem } from "common/interfaces";
import * as Action from "store/actions";

interface ISidebarState {
  sidebarDialogs: ISidebarChatItem[];
  sidebarBlockedUsers: ISidebarFriendItem[];
  sidebarFoundUsers: ISidebarFriendItem[];
  selectedFile: Blob;
  groupMembers: string[];
  groupName: string;
}

const sidebarState: ISidebarState = {
  sidebarDialogs: [],
  sidebarBlockedUsers: [],
  sidebarFoundUsers: [],
  selectedFile: new Blob(),
  groupMembers: [],
  groupName: "",
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
  [Action.setGroupChatMembers.type]: (state, action) => {
    return {
      ...state,
      groupMembers: action.payload,
    };
  },
  [Action.setGroupChatName.type]: (state, action) => {
    return {
      ...state,
      groupName: action.payload,
    };
  },
  [Action.setGroupChatImage.type]: (state, action) => {
    return {
      ...state,
      selectedFile: action.payload,
    };
  },
});
