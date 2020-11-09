import { createReducer } from "@reduxjs/toolkit";
import * as Action from "./actions";
import { performSignUpRequest } from "../common/requests";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

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
}

const rootState: IRootState = {
  isAuth: false,
  userId: "",
  errorMessage: "",
  isReset: false,
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
});

export const mainReducer = combineReducers({
  auth: authUserReducer,
  root: rootReducer,
});

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authUserReducer,
    root: rootReducer,
  });
