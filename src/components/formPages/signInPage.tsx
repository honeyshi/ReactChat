import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormContainer,
  Form,
  FormGroup,
  Input,
  TextField,
} from "components";
import { setLogin, setPassword, setErrorMessage } from "store/actions";
import { performSignInRequest } from "common/requests";
import { RootState } from "store/stores";

export const SignInPage: React.FC = () => {
  const link = <Link to="/signup">Sign up</Link>;
  const rootState = useSelector((state: RootState) => state.root);
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setErrorMessage(""));
  }, []);

  return (
    <FormContainer>
      {/* <!-- Header --> */}
      <TextField center bold text="Sign in" type="h1" />
      {/* <!-- Text --> */}
      <TextField
        center
        mb="6"
        text="Welcome to the official Chat web-client."
        type="p"
      />
      <Form>
        {/* <!-- Login -->*/}
        <FormGroup withLabel forName="login" label="Login">
          <Input
            id="login"
            placeholder="Enter your login"
            type="input"
            isInvalid={rootState.errorMessage.toLowerCase().includes("login")}
            onChange={(login) => dispatch(setLogin(login))}
          />
        </FormGroup>
        {/* <!-- Password -->*/}
        <FormGroup withLabel forName="password" label="Password">
          <Input
            id="password"
            placeholder="Enter your password"
            type="input"
            inputType="password"
            isInvalid={rootState.errorMessage
              .toLowerCase()
              .includes("password")}
            onChange={(password) => dispatch(setPassword(password))}
          />
        </FormGroup>
        {/* <!-- Error text --> */}
        <TextField
          center
          danger
          mb="6"
          text={rootState.errorMessage}
          type="p"
        />
        <FormGroup>
          <Link to="/send-reset-link" className="text-center">
            Reset password
          </Link>
        </FormGroup>
        <Button
          primary
          long
          block
          text="Sign in"
          onClick={() =>
            performSignInRequest(
              authState.login,
              authState.password,
              rootState.isReset
            )
          }
        />
      </Form>
      <TextField center type="p">
        Don't have an account yet {link}.
      </TextField>
    </FormContainer>
  );
};
