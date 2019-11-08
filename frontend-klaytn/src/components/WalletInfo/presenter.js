import React from "react";
import { KLAY_FAUCET } from "constants/url";
import Input from "components/Input";
import styled from "styled-components";
import AccountInfo from "../WalletComponents/AccountInfo";
import Menu from "../WalletComponents/Menu";
import UserInfo from "../WalletComponents/UserInfo";
import TransactionsList from "../WalletComponents/TransactionsList";

const Container = styled.div``;

const GreenFont = styled.p`
  font-size: 12px;
  color: ${props => props.theme.lightGreen};
`;

export default ({ address, balance }) => {
  return (
    <Container>
      <UserInfo />
      <AccountInfo address={address} balance={balance} />
      <Menu />
      <TransactionsList />
    </Container>
  );
};
