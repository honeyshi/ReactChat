import { combineReducers } from "redux";
import { authUserReducer } from "./authUserReducer";
import { chatReducer } from "./chatReducer";
import { rootReducer } from "./rootReducer";
import { sidebarReducer } from "./sidebarReducer";

export const mainReducer = combineReducers({
  auth: authUserReducer,
  root: rootReducer,
  sidebar: sidebarReducer,
  chat: chatReducer,
});
