import React, { useEffect } from "react";
import {
  Button,
  FormContainer,
  Form,
  FormGroup,
  Input,
  TextField,
} from "../base";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setErrorMessage } from "../../store/actions";
import { performSendLinkRequest } from "../../common/requests";
import { RootState } from "../../store/stores";

export const ResetPasswordSendLinkPage: React.FC = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(
    (state: RootState) => state.root.errorMessage
  );
  const login = useSelector((state: RootState) => state.auth.login);
  useEffect(() => {
    dispatch(setErrorMessage(""));
  }, []);

  return (
    <FormContainer>
      {/* <!-- Header --> */}
      <TextField center bold text="Reset password" type="h1" />
      {/* <!-- Text --> */}
      <TextField
        center
        mb="6"
        text="Enter your login to reset password."
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
        {/* <!-- Error text --> */}
        <TextField center danger mb="6" text={errorMessage} type="p" />
        <Button
          primary
          long
          block
          text="Send New Password"
          onClick={() => performSendLinkRequest(login)}
        />
      </Form>
    </FormContainer>
  );
};
