import React, { useState } from "react";
import caver from "../klaytn/caver";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";
import useInput from "../hooks/useInput";

const Wrapper = styled.div``;

const SignupInput = styled(Input)`
  margin-bottom: 10px;
`;

const PKButton = styled(Button)`
  background-color: #17202e;
`;

const SignupButton = styled(Button)`
  margin-top: 50px;
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
      // TODO: sign up

      console.log(email.value, username.value, password.value);
    }
  };

  return (
    <Wrapper>
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
