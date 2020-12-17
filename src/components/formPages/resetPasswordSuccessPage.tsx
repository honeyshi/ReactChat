import React from "react";
import { Button, FormContainer, TextField } from "../base";
import { history } from "../../store/stores";

export const ResetPasswordSuccessPage: React.FC = () => {
  return (
    <FormContainer>
      {/* <!-- Text --> */}
      <TextField
        center
        mb="6"
        text="New password is sent to your email."
        type="p"
      />
      <Button
        primary
        long
        block
        text="Continue"
        onClick={() => history.push("/signin")}
      />
    </FormContainer>
  );
};
