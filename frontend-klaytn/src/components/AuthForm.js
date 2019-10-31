import React, { useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Container = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxCardWidth};
  padding: 72px 60px 83px;
  margin-top: 100px;
  ${props => props.theme.whiteBox}
`;

const Message = styled.p`
  color: ${props => props.theme.brownGrey};
  font-size: 12px;
  margin-top: 50px;
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
      {loginForm ? <LoginForm /> : <SignupForm />}
      <Message>
        {loginForm ? "Don't have an account? " : "Have an account? "}
        <Link onClick={toggleForm}>{loginForm ? "Sign up" : "Login"}</Link>
      </Message>
    </Container>
  );
};
