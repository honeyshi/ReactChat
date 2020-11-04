import { createReducer } from "@reduxjs/toolkit";
import * as Action from "./actions";
import {
  performSignUpRequest,
  performSignInRequest,
  performSendLinkRequest,
  performResetPasswordRequest,
  testRequest,
} from "../common/requests";
import { combineReducers } from "redux";

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
  [Action.signUp.type]: (state, action) => {
    //performSignUpRequest(state.login, state.email, state.password);
    testRequest();
  },
  [Action.signIn.type]: (state, action) => {
    performSignInRequest(state.login, state.password);
  },
  [Action.sendResetLink.type]: (state, action) => {
    performSendLinkRequest(state.email);
  },
  [Action.resetPassword.type]: (state, action) => {
    performResetPasswordRequest(state.password, state.confirmPassword);
  },
});

interface IRootState {
  isAuth: boolean;
  userId: string;
  errorMessage: string;
}

const rootState: IRootState = {
  isAuth: false,
  userId: "",
  errorMessage: "",
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
});

export const mainReducer = combineReducers({
  auth: authUserReducer,
  root: rootReducer,
});
