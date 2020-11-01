import { createAction } from "@reduxjs/toolkit";
import { ActionTypes } from "./actionTypes";

export const setEmail = createAction<string>(ActionTypes.COMMON_SETEMAIL);
export const setLogin = createAction<string>(ActionTypes.COMMON_SETLOGIN);
export const setPassword = createAction<string>(ActionTypes.COMMON_SETPASSWORD);
export const confirmPassword = createAction<string>(
  ActionTypes.COMMON_CONFIRMPASSWORD
);
export const setIsAuth = createAction<boolean>(ActionTypes.COMMON_SET_ISAUTH);
export const setUserId = createAction<string>(ActionTypes.COMMON_SET_USERID);

export const signUp = createAction(ActionTypes.SIGN_UP);
export const signIn = createAction(ActionTypes.SIGN_IN);
export const sendResetLink = createAction(ActionTypes.SEND_RESET_LINK);
export const resetPassword = createAction(ActionTypes.RESET_PASSWORD);
