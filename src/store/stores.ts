import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer, { mainReducer } from "./reducers";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export function configureStore() {
  const store = createStore(
    createRootReducer(history),
    compose(applyMiddleware(routerMiddleware(history)))
  );
  return store;
}

export type RootState = ReturnType<typeof mainReducer>;
