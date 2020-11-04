import React from "react";
import {
  Button,
  FormContainer,
  Form,
  FormGroup,
  Input,
  TextField,
} from "../base";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setPassword, signIn } from "../../store/actions";
import { RootState } from "../../store/stores";

export const SignInPage: React.FC = () => {
  const link = <Link to="/signup">Sign up</Link>;
  const errorMessage = useSelector(
    (state: RootState) => state.root.errorMessage
  );
  const dispatch = useDispatch();
  const loginAsync = async () => {
    await dispatch(signIn());
  };

  return (
    <FormContainer>
      {/* <!-- Header --> */}
      <TextField isCenter={true} isBold={true} text="Sign in" type="h1" />
      {/* <!-- Text --> */}
      <TextField
        isCenter={true}
        isBold={false}
        classes="mb-6"
        text="Welcome to the official Chat web-client."
        type="p"
      />
      <Form>
        {/* <!-- Login -->*/}
        <FormGroup
          forName="login"
          label="Login"
          isVisible={false}
          isWithLabel={true}
        >
          <Input
            id="login"
            placeholder="Enter your login"
            type="input"
            onChange={(login) => dispatch(setLogin(login))}
          />
        </FormGroup>
        {/* <!-- Password -->*/}
        <FormGroup
          forName="password"
          label="Password"
          isVisible={false}
          isWithLabel={true}
        >
          <Input
            id="password"
            placeholder="Enter your password"
            type="input"
            inputType="password"
            onChange={(password) => dispatch(setPassword(password))}
          />
        </FormGroup>
        {/* <!-- Error text --> */}
        <TextField
          isCenter={true}
          isBold={false}
          classes="mb-6 text-danger"
          text={errorMessage}
          type="p"
        />
        <FormGroup isWithLabel={false}>
          <Link to="/send-reset-link" className="text-center">
            Reset password
          </Link>
        </FormGroup>
        <Button
          isPrimary={true}
          text="Sign in"
          classes="btn-lg btn-block"
          onClick={loginAsync}
        />
      </Form>
      <TextField isCenter={true} isBold={false} type="p">
        Don't have an account yet {link}.
      </TextField>
    </FormContainer>
  );
};

//export default connect<StateProps, {}, {}>(mapStateToProps)(SignInPage);
//export default connector(SignInPage);
