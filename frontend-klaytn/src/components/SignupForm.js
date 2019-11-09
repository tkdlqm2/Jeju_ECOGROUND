import React, { useState } from "react";
import caver from "../klaytn/caver";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import userApi  from '../api/user';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignupInput = styled(Input)`
  margin-bottom: 10px;
`;

const PKButton = styled(Button)`
  background-color: #17202e;
`;

const SignupButton = styled(Button)`
  margin-top: 40px;
`;

const LogoImage = styled.img.attrs({
  src: "https://1.bp.blogspot.com/-Y4N0BKHt0x0/XcURWNtr-XI/AAAAAAAAADY/EIrCmxnBMB4y9u_rVOc6bjq8_TJgfXgdACLcBGAsYHQ/s1600/Long%2BLogo.png"
})`
  width: 304px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
`

export default () => {
  const [privateKey, setPrivateKey] = useState(null);
  const username = useInput("");
  const email = useInput("");
  const password = useInput("");

  const generatePrivateKey = () => {
    const { privateKey } = caver.klay.accounts.create();
    setPrivateKey(privateKey);
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (email.value !== "" && username.value !== "" && password.value !== "") {
      
      const param = {
        email    : email.value,
        name     : username.value,
        password : password.value
      }
      
      if(userApi.signup(param)) {
        // TODO: 회원가입 성공액션
        return true;
      } else {
        // TODO: 회원가입 실패액션
        return false;
      }
      console.log(email.value, username.value, password.value);
    }
  };

  return (
    <Wrapper>
      <LogoImage/>
      <form onSubmit={onSubmit}>
        <Input
          label="Create new account"
          placeholder={"Username"}
          {...username}
        />
        <Input placeholder={"Password"} {...password} type="password" />
        <Input placeholder={"Email"} {...email} type="email"          />
        <br />
        <br />
        <SignupInput
          placeholder="Generate Private Key to Sign up"
          value={privateKey || ""}
          label="Private key"
          readOnly
        />
        <PKButton onClick={generatePrivateKey}>Generate Private Key</PKButton>
        <SignupButton>Sign Up</SignupButton>
      </form>
    </Wrapper>
  );
};
