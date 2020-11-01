import React from "react";
import { TextField } from "../base/textField";
import { FormContainer } from "../base/formContainer";
import { Form } from "../base/form";
import { FormGroup } from "../base/formGroup";
import { Input } from "../base/input";
import { Button } from "../base/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setPassword, signIn } from "../../store/actions";

export const SignInPage: React.FC = () => {
  const link = <Link to="/signup">Sign up</Link>;
  const dispatch = useDispatch();

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
        <FormGroup forName="login" label="Login" isVisible={false}>
          <Input
            id="login"
            placeholder="Enter your login"
            type="input"
            onChange={(login) => dispatch(setLogin(login))}
          />
        </FormGroup>
        {/* <!-- Password -->*/}
        <FormGroup forName="password" label="Password" isVisible={false}>
          <Input
            id="password"
            placeholder="Enter your password"
            type="input"
            inputType="password"
            onChange={(password) => dispatch(setPassword(password))}
          />
        </FormGroup>
        <FormGroup isWithLabel={false}>
          <Link to="/send-reset-link" className="text-center">
            Reset password
          </Link>
        </FormGroup>
        <Button
          isPrimary={true}
          text="Sign in"
          classes="btn-lg btn-block"
          onClick={() => dispatch(signIn())}
        />
      </Form>
      <TextField isCenter={true} isBold={false} type="p">
        Don't have an account yet {link}.
      </TextField>
    </FormContainer>
  );
};
