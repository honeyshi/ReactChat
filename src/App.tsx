import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  ChatPage,
  ResetPasswordPage,
  ResetPasswordSendLinkPage,
  ResetPasswordSuccessPage,
  SignInPage,
  SignUpPage,
} from "components";

import "./styles.scss";
import "./components/layout.scss";
import "./components/spacing.scss";
import "react-notifications/lib/notifications.css";

export const App: React.FC = () => {
  return (
    <div className="layout">
      <Switch>
        <Route exact path="/" component={ChatPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route
          exact
          path="/send-reset-link"
          component={ResetPasswordSendLinkPage}
        />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <Route
          exact
          path="/success-reset"
          component={ResetPasswordSuccessPage}
        />
      </Switch>
    </div>
  );
};
