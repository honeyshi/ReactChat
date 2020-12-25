import { createAction } from "@reduxjs/toolkit";
import { RootActionTypes } from "store/actionTypes";
import { IUserInfo } from "common/interfaces";

export const setIsAuth = createAction<boolean>(
  RootActionTypes.COMMON_SET_ISAUTH
);
export const setUserId = createAction<string>(
  RootActionTypes.COMMON_SET_USERID
);
export const setErrorMessage = createAction<string>(
  RootActionTypes.COMMON_SET_ERRORMESSAGE
);
export const setResetState = createAction<boolean>(
  RootActionTypes.COMMON_SET_ISRESET
);
export const setActiveNavbar = createAction<string>(
  RootActionTypes.COMMON_SET_ACTIVENAVBAR
);
export const setUserInfo = createAction<IUserInfo>(
  RootActionTypes.SET_USERINFO
);
