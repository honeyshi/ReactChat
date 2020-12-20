import { createReducer } from "@reduxjs/toolkit";
import { IChat } from "../../common/interfaces";
import { ChatType } from "../../common/variables";
import { setCurrentChat } from "../actions";

interface IChatState {
  chatItem: IChat;
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
};

export const chatReducer = createReducer(chatState, {
  [setCurrentChat.type]: (state, action) => {
    return {
      ...state,
      chatItem: action.payload,
    };
  },
});
