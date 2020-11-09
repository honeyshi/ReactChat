import React, { useEffect } from "react";
import {
  Button,
  FormContainer,
  Form,
  FormGroup,
  Input,
  TextField,
} from "../base";
import {
  setPassword,
  confirmPassword,
  setErrorMessage,
} from "../../store/actions";
import { RootState } from "../../store/stores";
import { performResetPasswordRequest } from "../../common/requests";
import { useDispatch, useSelector } from "react-redux";

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
        <FormGroup
          forName="password"
          label="Password"
          isVisible={false}
          isWithLabel={true}
        >
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
          forName="confirm-password"
          label="Confirm password"
          isVisible={false}
          isWithLabel={true}
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
        <TextField
          isCenter={true}
          isBold={false}
          classes="mb-6 text-danger"
          text={errorMessage}
          type="p"
        />
        <Button
          isPrimary={true}
          text="Reset password"
          classes="btn-lg btn-block"
          onClick={() =>
            performResetPasswordRequest(
              localStorage.getItem("login"),
              state.password,
              state.confirmPassword
            )
          }
        />
      </Form>
    </FormContainer>
  );
};
