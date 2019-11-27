import React, { useState } from "react";
import caver from "../klaytn/caver";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import userApi from "../api/user";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignupInput = styled(Input)`
  margin-bottom: 10px;
`;

const PKButton = styled(Button)`
  background-color: ${props => props.theme.darkBrown};
`;

const SignupButton = styled(Button)`
  margin-top: 40px;
  background-color: #17202e;
`;

const LogoImage = styled.img.attrs({
  src:
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FSLVsC%2Fbtqz4LHsAH7%2F74SG5iB0IgJsKnk5H3lfN1%2Fimg.png"
})`
  width: 304px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
`;

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
        email: email.value,
        name: username.value,
        password: password.value
      };

      if (userApi.signup(param)) {
        // TODO: 회원가입 성공액션
        return true;
      } else {
        // TODO: 회원가입 실패액션
        return false;
      }
    }
  };

  return (
    <Wrapper>
      <LogoImage />
      <form onSubmit={onSubmit}>
        <Input
          label="Create new account"
          placeholder={"Username"}
          {...username}
        />
        <Input placeholder={"Password"} {...password} type="password" />
        <Input placeholder={"Email"} {...email} type="email" />
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
