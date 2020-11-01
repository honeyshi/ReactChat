import React from "react";
import { Form } from "../base/form";
import { FormGroup } from "../base/formGroup";
import { Input } from "../base/input";
import { FormContainer } from "../base/formContainer";
import { TextField } from "../base/textField";
import { Button } from "../base/button";
import { useDispatch } from "react-redux";
import {
  setPassword,
  confirmPassword,
  resetPassword
} from "../../store/actions";

export const ResetPasswordPage: React.FC = () => {
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
        text="Enter new password."
        type="p"
      />
      <Form>
        {/* <!-- New password -->*/}
        <FormGroup forName="password" label="Password" isVisible={false}>
          <Input
            id="password"
            placeholder="Enter new password"
            type="input"
            inputType="password"
            onChange={(password) => dispatch(setPassword(password))}
          />
        </FormGroup>
        {/* <!-- Confirm password -->*/}
        <FormGroup
          forName="confirm-password"
          label="Confirm password"
          isVisible={false}
        >
          <Input
            id="confirm-password"
            placeholder="Confirm password"
            type="input"
            inputType="password"
            onChange={(password) => dispatch(confirmPassword(password))}
          />
        </FormGroup>
        <Button
          isPrimary={true}
          text="Reset password"
          classes="btn-lg btn-block"
          onClick={() => dispatch(resetPassword())}
        />
      </Form>
    </FormContainer>
  );
};
