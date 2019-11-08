import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #17202e;
  color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 25px;
  z-index: 2;
  height: 60px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const HeaderLink = styled.div`
  a {
    color: #fff;
    font-weight: 700;
  }
  a:hover {
    color: ${props => props.theme.brownGrey};
  }
`;

const Divider = styled.span`
  padding: 10px;
`;

const Ground = styled.span`
  font-size: 20px;
  a {
    color: #fff;
    font-weight: 700;
  }
  a:hover {
    color: ${props => props.theme.brownGrey};
  }
`;

const Makers = styled.span`
  a {
    color: #fff;
    font-weight: 700;
  }
  a:hover {
    color: ${props => props.theme.brownGrey};
  }
`;

export default withRouter(({ history }) => {
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Ground>
            <Link to="/">ECO Ground</Link>
          </Ground>
          <Divider>|</Divider>
          <Makers>
            <Link to="/makers">ECO Makers</Link>
          </Makers>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink>
            <Link to="/wallet">Wallet</Link>
          </HeaderLink>
          <Divider></Divider>
          <HeaderLink>
            <Link to="/logout">Log out</Link>
          </HeaderLink>
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
