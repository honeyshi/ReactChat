import React from "react";
import { Button } from "../base/button";
import { FormGroup } from "../base/formGroup";
import { Input } from "../base/input";
import { TextField } from "../base/textField";
import { FormContainer } from "../base/formContainer";
import { Form } from "../base/form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail, setLogin, setPassword, signUp } from "../../store/actions";

export const SignUpPage: React.FC = () => {
  const link = <Link to="/signin">Sign in</Link>;
  const dispatch = useDispatch();

  return (
    <FormContainer>
      {/* <!-- Header --> */}
      <TextField isCenter={true} isBold={true} text="Sign up" type="h1" />
      {/* <!-- Text --> */}
      <TextField
        isCenter={true}
        isBold={false}
        classes="mb-6"
        text="Welcome to the official Chat web-client."
        type="p"
      />
      {/* <!-- Registration form --> */}
      <Form>
        {/* <!-- Login -->*/}
        <FormGroup forName="login" label="Login" isVisible={false} isWithLabel={true}>
          <Input
            id="login"
            placeholder="Enter your login"
            type="input"
            onChange={(login) => dispatch(setLogin(login))}
          />
        </FormGroup>
        {/* <!-- Email -->*/}
        <FormGroup forName="email" label="Email Address" isVisible={false} isWithLabel={true}>
          <Input
            id="email"
            placeholder="Enter your email"
            type="input"
            onChange={(email) => dispatch(setEmail(email))}
          />
        </FormGroup>
        {/* <!-- Password -->*/}
        <FormGroup forName="password" label="Password" isVisible={false} isWithLabel={true}>
          <Input
            id="password"
            placeholder="Enter your password"
            type="input"
            inputType="password"
            onChange={(password) => dispatch(setPassword(password))}
          />
        </FormGroup>
        <Button
          isPrimary={true}
          text="Sign up"
          classes="btn-lg btn-block"
          onClick={() => dispatch(signUp())}
        />
      </Form>
      <TextField isCenter={true} isBold={false} type="p">
        Already have an account? {link}.
      </TextField>
    </FormContainer>
  );
};
