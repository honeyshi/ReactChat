import React from "react";
import { Form } from "../base/form";
import { FormGroup } from "../base/formGroup";
import { Input } from "../base/input";
import { FormContainer } from "../base/formContainer";
import { TextField } from "../base/textField";
import { Button } from "../base/button";
import { useDispatch } from "react-redux";
import { setEmail, sendResetLink } from "../../store/actions";

export const ResetPasswordSendLinkPage: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <FormContainer>
      {/* <!-- Header --> */}
      <TextField
        isCenter={true}
        isBold={true}
        text="Reset password"
        type="h1"
      />
      {/* <!-- Text --> */}
      <TextField
        isCenter={true}
        isBold={false}
        classes="mb-6"
        text="Enter your email address to reset password."
        type="p"
      />
      <Form>
        {/* <!-- Email -->*/}
        <FormGroup forName="email" label="Email Address" isVisible={false} isWithLabel={true}>
          <Input
            id="email"
            placeholder="Enter your email"
            type="input"
            onChange={(email) => dispatch(setEmail(email))}
          />
        </FormGroup>
        <Button
          isPrimary={true}
          text="Send Reset Link"
          classes="btn-lg btn-block"
          onClick={() => dispatch(sendResetLink())}
        />
      </Form>
    </FormContainer>
  );
};
