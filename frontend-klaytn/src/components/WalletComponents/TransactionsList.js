import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${props => props.theme.brownGrey};
  width: ${props => props.theme.maxCardWidth};
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default () => {
  return (
    <Container>
      <div>transaction list</div>
    </Container>
  );
};
