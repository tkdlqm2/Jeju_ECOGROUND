import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.theme.maxCardWidth};
`;

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 18px;
  font-size: 27px;
  font-weight: 700;
`;

const Description = styled.p`
  width: 96%;
  font-size: 16px;
  margin-bottom: 18px;
  font-weight: 100;
  line-height: 160%;
`;

const ProductInfo = ({ title, description, D_day, tokenId }) => (
  <Container>
    <Link to={`/makers/${tokenId}`}>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Link>
  </Container>
);

export default ProductInfo;
