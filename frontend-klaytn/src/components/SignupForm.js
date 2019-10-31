import React, { useState } from "react";
import caver from "../klaytn/caver";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";
import useInput from "../hooks/useInput";

const Wrapper = styled.div``;

const SignupInput = styled(Input)`
  margin-bottom: 16px;
  input {
    padding-left: 48px;
    background: 16px center / 24px no-repeat
      url("../../static/images/icon-lock.png");
  }
`;

const SignupButton = styled(Button)`
  margin-bottom: 80px;
  background-color: white;

  /* @include breakpoint("max-card") {
  margin-bottom: 30px;
} */
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
        <SignupButton
          title="Generate Private key"
          onClick={generatePrivateKey}
        />
        <Button title={"Sign up"} />
      </form>
    </Wrapper>
  );
};
