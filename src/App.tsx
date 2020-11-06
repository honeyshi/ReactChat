import * as React from "react";
import { ChatLayout } from "./components/chat/chatLayout";
import { Sidebar } from "./components/sidebar/sidebar";
import { Navbar } from "./components/navigation/navbar";
import {
  ResetPasswordPage,
  ResetPasswordSendLinkPage,
  SignInPage,
  SignUpPage,
} from "./components/formPages";
import { Switch, Route, withRouter } from "react-router-dom";
import { RootState } from "./store/stores";
import { connect, ConnectedProps } from "react-redux";

import "./styles.scss";
import "./components/layout.scss";
import "./components/spacing.scss";

const mapStateToProps = (state: RootState) => {
  return {
    errorMessage: state.root.errorMessage,
  };
};

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

const App: React.FC<Props> = () => {
  return (
    <div className="layout">
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

export default withRouter(connector(App));
