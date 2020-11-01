import * as React from "react";
import { ChatLayout } from "./components/chat/chatLayout";
import { Sidebar } from "./components/sidebar/sidebar";
import { Navbar } from "./components/navigation/navbar";
import { SignUpPage } from "./components/formPages/signUpPage";
import { SignInPage } from "./components/formPages/signInPage";
import { ResetPasswordSendLinkPage } from "./components/formPages/resetPasswordSendLinkPage";
import { ResetPasswordPage } from "./components/formPages/resetPasswordPage";
import { Switch, Route } from "react-router-dom";

import "./styles.scss";
import "./components/layout.scss";
import "./components/spacing.scss";

export const App: React.FC = () => {
  return (
    <div className="layout">
      {/*<SignUpPage />*/}
      {/*<SignInPage />*/}
      {/*<ResetPasswordSendLinkPage />*/}
      {/*<ResetPasswordPage />*/}
      {/*<Navbar />
      <Sidebar />
      <ChatLayout />*/}
      <Switch>
        <Route exact path="/" component={SignUpPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route
          exact
          path="/send-reset-link"
          component={ResetPasswordSendLinkPage}
        />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
      </Switch>
    </div>
  );
};

export default App;
