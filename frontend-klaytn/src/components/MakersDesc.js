import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.theme.maxCardWidth};
`;

const Description = styled.p`
  width: 96%;
  font-size: 16px;
  margin-bottom: 18px;
  font-weight: 100;
  line-height: 160%;
`;

export default ({ description }) => {
  return (
    <Container>
      <Description>{description}</Description>
    </Container>
  );
};
