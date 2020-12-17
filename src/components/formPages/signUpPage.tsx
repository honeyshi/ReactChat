import React, { useEffect } from "react";
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
import {
  setEmail,
  setErrorMessage,
  setLogin,
  setPassword,
} from "../../store/actions";
import { performSignUpRequest } from "../../common/requests";
import { RootState } from "../../store/stores";

export const SignUpPage: React.FC = () => {
  const link = <Link to="/signin">Sign in</Link>;
  const errorMessage = useSelector(
    (state: RootState) => state.root.errorMessage
  );
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setErrorMessage(""));
  }, []);

  return (
    <FormContainer>
      {/* <!-- Header --> */}
      <TextField center bold text="Sign up" type="h1" />
      {/* <!-- Text --> */}
      <TextField
        center
        mb="6"
        text="Welcome to the official Chat web-client."
        type="p"
      />
      {/* <!-- Registration form --> */}
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
            isInvalid={errorMessage.toLowerCase().includes("login")}
            onChange={(login) => dispatch(setLogin(login))}
          />
        </FormGroup>
        {/* <!-- Email -->*/}
        <FormGroup
          forName="email"
          label="Email Address"
          isVisible={false}
          isWithLabel={true}
        >
          <Input
            id="email"
            placeholder="Enter your email"
            type="input"
            isInvalid={errorMessage.toLowerCase().includes("email")}
            onChange={(email) => dispatch(setEmail(email))}
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
            isInvalid={errorMessage.toLowerCase().includes("password")}
            onChange={(password) => dispatch(setPassword(password))}
          />
        </FormGroup>
        {/* <!-- Error text --> */}
        <TextField center danger mb="6" text={errorMessage} type="p" />
        <Button
          primary
          long
          block
          text="Sign up"
          onClick={() =>
            performSignUpRequest(
              authState.login,
              authState.email,
              authState.password
            )
          }
        />
      </Form>
      <TextField center type="p">
        Already have an account? {link}.
      </TextField>
    </FormContainer>
  );
};
