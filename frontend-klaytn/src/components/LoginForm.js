import React, { useState } from "react";
import { connect } from "react-redux";
import { isValidPrivateKey } from "../utils/crypto";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";

import * as authActions from "../redux/actions/auth";
import useInput from "../hooks/useInput";
import userApi from "../api/user";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoImage = styled.img.attrs({
  src:
    "https://1.bp.blogspot.com/-Y4N0BKHt0x0/XcURWNtr-XI/AAAAAAAAADY/EIrCmxnBMB4y9u_rVOc6bjq8_TJgfXgdACLcBGAsYHQ/s1600/Long%2BLogo.png"
})`
  width: 304px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
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
`;

const LoginForm = ({ login }) => {
  const [warningMessage, setWarningMessage] = useState("");

  const privateKey = useInput("");
  const emailInput = useInput("");
  const passwordInput = useInput("");

  const handleLogin = () => {
    const privateKeyValue = privateKey.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    // TODO: log in --DEPRECATED
    userApi.login({ email, password });

    // 클레이튼 로그인
    if (email && password) {
      isValidPrivateKey(privateKeyValue)
        ? login(privateKeyValue)
        : setWarningMessage("* Invalid Private Key");
    } else {
      alert("아이디와 패스워드를 입력해주세요");
    }
  };

  return (
    <Container>
      <LogoImage />
      <LoginInput
        type="text"
        name="useremail"
        label="Log in"
        placeholder="id"
        onChange={emailInput.onChange}
        err={warningMessage}
      />
      <PwdInput
        type="password"
        name="password"
        placeholder="password"
        onChange={passwordInput.onChange}
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

export default connect(null, mapDispatchToProps)(LoginForm);
