import React from "react";
import { KLAY_FAUCET } from "constants/url";
import Input from "components/Input";
import styled from "styled-components";

const BalanceInput = styled(Input)`
  font-size: 16px;
  margin-bottom: 24px;
`;
const Link = styled.a`
  display: inline-block;
  font-weight: bold;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Container = styled.div``;

const FaucetP = styled.p`
  font-size: 12px;
  color: ${props => props.theme.lightGreen};
`;

export default ({ address, balance }) => {
  console.log("address:", address);
  return (
    <Container>
      <Input
        className="WalletInfo__address"
        name="address"
        label="Wallet Address"
        value={address}
        readOnly
      />
      <BalanceInput
        className="WalletInfo__balance"
        name="balance"
        label="Balance"
        value={`${balance} KLAY`}
        readOnly
      />
      <FaucetP>
        If you need small amount of Klay for testing.
        <Link href={KLAY_FAUCET} target="_blank" rel="noreferrer noopener">
          Run Klay Faucet
        </Link>
      </FaucetP>
    </Container>
  );
};
