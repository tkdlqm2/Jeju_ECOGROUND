import React from "react";
import styled from "styled-components";
import AccountCard from "./AccountCard";
import Avatar from "components/Avatar";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const Container = styled.div`
  background-color: ${props => props.theme.headerColor};
  width: ${props => props.theme.maxCardWidth};
  height: 360px;
  display: flex;
  flex-direction: column;
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

const Address = styled.p`
  color: white;
  font-size: 16px;
  margin-top: 40px;
`;

const WalletAddress = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: ${props => props.theme.lightGrey};
  margin-bottom: 5px;
`;

const Span = styled.span`
  margin-left: 10px;
`;

const RightCol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CopyContainer = styled.span`
  cursor: pointer;
`;

export default ({ address, balance }) => {
  const theme = createMuiTheme({
    palette: {
      primary: { main: "#ffffff" },
      secondary: { main: "#17202E" }
    },
    typography: {
      fontSize: 18
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Wrapper>
          <UserName>username님</UserName>
          <RightCol>
            <NotificationsNoneIcon
              color={"primary"}
              style={{ marginRight: 20 }}
            />
            <Avatar
              size={"md"}
              url={"https://material-ui.com/static/images/avatar/1.jpg"}
            />
          </RightCol>
        </Wrapper>
        <Address>
          <WalletAddress>Wallet Address</WalletAddress>
          {address}
          <Span />
          <CopyContainer>
            <FileCopyIcon fontSize={"small"} />
          </CopyContainer>
        </Address>
        <AccountCard address={address} balance={balance} />
      </Container>
    </ThemeProvider>
  );
};
