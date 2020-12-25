import { createAction } from "@reduxjs/toolkit";
import { AuthUserActionTypes } from "store/actionTypes";

export const setEmail = createAction<string>(
  AuthUserActionTypes.COMMON_SETEMAIL
);
export const setLogin = createAction<string>(
  AuthUserActionTypes.COMMON_SETLOGIN
);
export const setPassword = createAction<string>(
  AuthUserActionTypes.COMMON_SETPASSWORD
);
export const confirmPassword = createAction<string>(
  AuthUserActionTypes.COMMON_CONFIRMPASSWORD
);
