import { createReducer } from "@reduxjs/toolkit";
import { IUserInfo } from "common/interfaces";
import * as Action from "store/actions";

interface IRootState {
  isAuth: boolean;
  userId: string;
  errorMessage: string;
  isReset: boolean;
  activeNavbar: string;
  userInfo: IUserInfo;
}

const rootState: IRootState = {
  isAuth: false,
  userId: "4",
  errorMessage: "",
  isReset: false,
  activeNavbar: "tab-content-dialogs",
  userInfo: {
    userEmail: "",
    userImage: "",
    userLogin: "",
  },
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
  [Action.setUserInfo.type]: (state, action) => {
    return {
      ...state,
      userInfo: action.payload,
    };
  },
});
