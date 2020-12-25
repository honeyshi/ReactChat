import { createReducer } from "@reduxjs/toolkit";
import * as Action from "store/actions";

interface ILoaderState {
  isLoadingChats: boolean;
  isLoadingMessages: boolean;
  isLoadingSearch: boolean;
  isLoadingBlocked: boolean;
}

const loaderState: ILoaderState = {
  isLoadingChats: false,
  isLoadingMessages: false,
  isLoadingSearch: false,
  isLoadingBlocked: false,
};

export const loaderReducer = createReducer(loaderState, {
  [Action.setLoadChats.type]: (state, action) => {
    return {
      ...state,
      isLoadingChats: action.payload,
    };
  },
  [Action.setLoadMessages.type]: (state, action) => {
    return {
      ...state,
      isLoadingMessages: action.payload,
    };
  },
  [Action.setLoadSearch.type]: (state, action) => {
    return {
      ...state,
      isLoadingSearch: action.payload,
    };
  },
  [Action.setLoadBlocked.type]: (state, action) => {
    return {
      ...state,
      isLoadingBlocked: action.payload,
    };
  },
});
