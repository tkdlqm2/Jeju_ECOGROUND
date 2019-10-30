import React, { useState } from "react";
import { connect } from "react-redux";
import { isValidPrivateKey } from "../utils/crypto";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";

import * as authActions from "../redux/actions/auth";
import useInput from "../hooks/useInput";

const Container = styled.div``;

const LoginInput = styled(Input)`
  margin-bottom: 16px;
  & input {
    padding-left: 48px;
    background: 16px center / 24px no-repeat
      url("../../static/images/icon-lock.png");
  }
`;

const LoginButton = styled(Button)`
  margin-bottom: 80px;

  /* @include breakpoint("max-card") {
  margin-bottom: 30px;
  }; */
`;

const LoginForm = ({ login }) => {
  const [privateKey, setPrivateKey] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  const inputPK = useInput("");

  const handleLogin = () => {
    isValidPrivateKey(privateKey)
      ? login(privateKey)
      : setWarningMessage("* Invalid Private Key");
  };

  return (
    <Container>
      <LoginInput
        type="password"
        name="privateKey"
        label="Login with Private Key"
        placeholder="0x2c4078447..."
        onChange={inputPK.onChange}
        err={warningMessage}
      />
      <LoginButton title="Log in" onClick={handleLogin} />
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({
  login: privateKey => dispatch(authActions.login(privateKey))
});

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
