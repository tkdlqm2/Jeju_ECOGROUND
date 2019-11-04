import React, { useState } from "react";
import { connect } from "react-redux";
import { isValidPrivateKey } from "../utils/crypto";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";

import * as authActions from "../redux/actions/auth";
import useInput from "../hooks/useInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginInput = styled(Input)`
  margin-bottom: 10px;
`;

const PwdInput = styled(Input)`
  margin-bottom: 30px;
`;

const LoginButton = styled(Button)`
  margin-top: 10px;
  color: white;
  /* @include breakpoint("max-card") {
  margin-bottom: 30px;
  }; */
`;

const LoginForm = ({ login }) => {
  const [warningMessage, setWarningMessage] = useState("");

  const privateKey = useInput("");
  const username = useInput("");
  const password = useInput("");

  const handleLogin = () => {
    const privateKeyValue = privateKey.value;
    const usernameValue = username.value;
    const passwordValue = password.value;

    // 웹 로그인

    if (usernameValue && passwordValue) {
      isValidPrivateKey(privateKeyValue)
        ? login(privateKeyValue)
        : setWarningMessage("* Invalid Private Key");
    } else {
      alert("아이디와 패스워드를 입력해주세요");
    }
  };

  return (
    <Container>
      <LoginInput
        type="text"
        name="username"
        label="Log in"
        placeholder="id"
        onChange={username.onChange}
        err={warningMessage}
      />
      <PwdInput
        type="password"
        name="password"
        placeholder="password"
        onChange={password.onChange}
        err={warningMessage}
      />
      <LoginInput
        type="password"
        name="privateKey"
        label="Private Key"
        placeholder="0x2c4078447..."
        onChange={privateKey.onChange}
        err={warningMessage}
      />
      <LoginButton onClick={handleLogin}>Log in</LoginButton>
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
