import React, { useState } from "react";
import caver from "../klaytn/caver";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";
import useInput from "../hooks/useInput";

const Wrapper = styled.div``;

const SignupInput = styled(Input)`
  margin-bottom: 20px;
`;

const SignupButton = styled(Button)`
  margin-top: 30px;
  background-color: ${props => props.theme.darkGreen};
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
      // sign up

      console.log(email.value, username.value, password.value);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <Input placeholder={"Username"} {...username} />
        <Input placeholder={"Password"} {...password} type="password" />
        <Input placeholder={"Email"} {...email} type="email" />
        <SignupInput
          placeholder="Generate Private Key to Sign up"
          value={privateKey || ""}
          label="Private key"
          readOnly
        />
        <Button onClick={generatePrivateKey}>Generate Private Key</Button>
        <SignupButton>Sign Up</SignupButton>
      </form>
    </Wrapper>
  );
};
