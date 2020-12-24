import { createReducer } from "@reduxjs/toolkit";
import { IChat, IUserInfo } from "common/interfaces";
import { ChatType } from "common/variables";
import { setChatMembers, setCurrentChat } from "store/actions";

interface IChatState {
  chatItem: IChat;
  chatMembers: IUserInfo[];
}

const chatState: IChatState = {
  chatItem: {
    chatHeader: "",
    chatId: "",
    chatImage: "",
    chatType: ChatType.group,
    isAdmin: false,
    isOnline: "",
    chatMessages: [],
    userNote: "",
  },
  chatMembers: [],
};

export const chatReducer = createReducer(chatState, {
  [setCurrentChat.type]: (state, action) => {
    return {
      ...state,
      chatItem: action.payload,
    };
  },
  [setChatMembers.type]: (state, action) => {
    return {
      ...state,
      chatMembers: action.payload,
    };
  },
});
