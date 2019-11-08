import React from "react";
import styled from "styled-components";
import AccountInfo from "./AccountInfo";
import Avatar from "components/Avatar";

const Container = styled.div`
  background-color: ${props => props.theme.headerColor};
  width: ${props => props.theme.maxCardWidth};
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 600;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`;

const Address = styled.div`
  color: white;
  font-size: 16px;
  margin-top: 40px;
`;

export default ({ address, balance }) => {
  return (
    <Container>
      <Wrapper>
        <UserName>username님</UserName>
        <Avatar
          size={"md"}
          url={"https://material-ui.com/static/images/avatar/1.jpg"}
        />
      </Wrapper>
      <Address>{address}</Address>
      <AccountInfo address={address} balance={balance} />
    </Container>
  );
};
