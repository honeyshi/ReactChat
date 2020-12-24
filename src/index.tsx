import React from "react";
import { render } from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "store/stores";
import { history } from "core/history";
import { App } from "./App";

const root = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

render(root, document.getElementById("root"));
