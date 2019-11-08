import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${props => props.theme.bgColor};
  width: ${props => props.theme.maxCardWidth};
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default () => {
  return (
    <Container>
      <div>menu</div>
    </Container>
  );
};
