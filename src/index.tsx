import * as React from "react";
import { render } from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { configureStore, history } from "./store/stores";

import App from "./App";

export const store = configureStore();

const root = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

render(root, document.getElementById("root"));
