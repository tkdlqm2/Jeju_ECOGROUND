import React, { useState } from "react";
import caver from "../klaytn/caver";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";

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

  /* @include breakpoint("max-card") {
  margin-bottom: 30px;
} */
`;

export default () => {
  const [privateKey, setPrivateKey] = useState(null);

  const generatePrivateKey = () => {
    const { privateKey } = caver.klay.accounts.create();
    setPrivateKey(privateKey);
  };

  return (
    <div className="SignupForm">
      <SignupInput
        placeholder="Generate Private Key to Sign up"
        value={privateKey || ""}
        label="Private key"
        readOnly
      />
      <SignupButton title="Generate Private key" onClick={generatePrivateKey} />
    </div>
  );
};
