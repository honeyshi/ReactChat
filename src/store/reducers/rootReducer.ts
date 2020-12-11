import { createReducer } from "@reduxjs/toolkit";
import * as Action from "../actions";

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
