import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
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

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authUserReducer,
    root: rootReducer,
    sidebar: sidebarReducer,
    chat: chatReducer,
  });
