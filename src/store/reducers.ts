import { createReducer } from "@reduxjs/toolkit";
import * as Action from "./actions";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import {
  IChat,
  ISidebarChatItem,
  ISidebarFriendItem,
} from "../common/interfaces";

interface IAuthInitialState {
  email: string;
  login: string;
  password: string;
  confirmPassword: string;
}

const authInitialState: IAuthInitialState = {
  email: "",
  login: "",
  password: "",
  confirmPassword: "",
};

export const authUserReducer = createReducer(authInitialState, {
  [Action.setLogin.type]: (state, action) => {
    return {
      ...state,
      login: action.payload,
    };
  },
  [Action.setEmail.type]: (state, action) => {
    return {
      ...state,
      email: action.payload,
    };
  },
  [Action.setPassword.type]: (state, action) => {
    return {
      ...state,
      password: action.payload,
    };
  },
  [Action.confirmPassword.type]: (state, action) => {
    return {
      ...state,
      confirmPassword: action.payload,
    };
  },
});

interface IRootState {
  isAuth: boolean;
  userId: string;
  errorMessage: string;
  isReset: boolean;
  activeNavbar: string;
}

const rootState: IRootState = {
  isAuth: false,
  userId: "2",
  errorMessage: "",
  isReset: false,
  activeNavbar: "tab-content-dialogs",
};

export const rootReducer = createReducer(rootState, {
  [Action.setIsAuth.type]: (state, action) => {
    return {
      ...state,
      isAuth: action.payload,
    };
  },
  [Action.setUserId.type]: (state, action) => {
    return {
      ...state,
      userId: action.payload,
    };
  },
  [Action.setErrorMessage.type]: (state, action) => {
    return {
      ...state,
      errorMessage: action.payload,
    };
  },
  [Action.setResetState.type]: (state, action) => {
    return {
      ...state,
      isReset: action.payload,
    };
  },
  [Action.setActiveNavbar.type]: (state, action) => {
    return {
      ...state,
      activeNavbar: action.payload,
    };
  },
});

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

const sidebarReducer = createReducer(sidebarState, {
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

interface IChatState {
  chatItem: IChat;
}

const chatState: IChatState = {
  chatItem: {
    chatHeader: "",
    chatImage: "",
    chatType: 1,
    isOnline: "",
    chatMessages: [],
  },
};

const chatReducer = createReducer(chatState, {
  [Action.setCurrentChat.type]: (state, action) => {
    return {
      ...state,
      chatItem: action.payload,
    };
  },
});

export const mainReducer = combineReducers({
  auth: authUserReducer,
  root: rootReducer,
  sidebar: sidebarReducer,
  chat: chatReducer,
});

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authUserReducer,
    root: rootReducer,
    sidebar: sidebarReducer,
    chat: chatReducer,
  });
