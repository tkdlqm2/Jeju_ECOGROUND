import React, { useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Container = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxCardWidth};
  padding: 72px 60px 83px;
  /* @include cardBox();
  @include absolute-center();
  @include breakpoint("max-card") {
    background-color: unset;
    border: unset;
    padding: 40px 40px 20px;
  } */
`;

const H2 = styled.h2`
  display: inline-block;
  font-size: 18px;
  font-weight: normal;
  color: ${props => props.theme.brownGrey};
  line-height: 1.4;
  margin-bottom: 30px;

  &::after {
    content: "";
    display: inline-block;
    margin-bottom: -18px;
    margin-left: -100%;
    transform: translateX(100%);
    width: 16px;
    height: 2px;
    background-color: ${props => props.theme.lightGrey};
  }
`;

const Message = styled.p`
  color: ${props => props.theme.brownGrey};
  font-size: 12px;
`;

const Link = styled.span`
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default () => {
  const [loginForm, setLoginForm] = useState(true);

  const toggleForm = () => {
    if (loginForm === true) {
      setLoginForm(false);
    } else {
      setLoginForm(true);
    }
  };

  return (
    <Container>
      <H2>
        Klaytn-based
        <br />
        Eco friendly e-commerce
      </H2>
      {loginForm ? <LoginForm /> : <SignupForm />}
      <Message>
        {loginForm ? "Don't have an account? " : "Have an account? "}
        <Link onClick={toggleForm}>{loginForm ? "Sign up" : "Login"}</Link>
      </Message>
    </Container>
  );
};
