import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormContainer,
  Form,
  FormGroup,
  Input,
  TextField,
} from "components";
import { setPassword, confirmPassword, setErrorMessage } from "store/actions";
import { RootState } from "store/stores";
import { performResetPasswordRequest } from "common/requests";

export const ResetPasswordPage: React.FC = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(
    (state: RootState) => state.root.errorMessage
  );
  const state = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(setErrorMessage(""));
  }, []);

  return (
    <FormContainer>
      {/* <!-- Header --> */}
      <TextField center bold text="Reset password" type="h1" />
      {/* <!-- Text --> */}
      <TextField center mb="6" text="Enter new password." type="p" />
      <Form>
        {/* <!-- New password -->*/}
        <FormGroup withLabel forName="password" label="Password">
          <Input
            id="password"
            placeholder="Enter new password"
            type="input"
            inputType="password"
            isInvalid={errorMessage.toLowerCase().includes("password")}
            onChange={(password) => dispatch(setPassword(password))}
          />
        </FormGroup>
        {/* <!-- Confirm password -->*/}
        <FormGroup
          withLabel
          forName="confirm-password"
          label="Confirm password"
        >
          <Input
            id="confirm-password"
            placeholder="Confirm password"
            type="input"
            inputType="password"
            isInvalid={errorMessage.toLowerCase().includes("password")}
            onChange={(password) => dispatch(confirmPassword(password))}
          />
        </FormGroup>
        {/* <!-- Error text --> */}
        <TextField center danger mb="6" text={errorMessage} type="p" />
        <Button
          primary
          long
          block
          text="Reset password"
          onClick={() =>
            performResetPasswordRequest(
              state.login,
              state.password,
              state.confirmPassword
            )
          }
        />
      </Form>
    </FormContainer>
  );
};
