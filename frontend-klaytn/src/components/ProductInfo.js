import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { HeartEmpty } from "./Icons";
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
  width: 90%;
  font-size: 16px;
  margin-bottom: 18px;
  font-weight: 400;
`;

const DDay = styled.span`
  font-size: 14px;
  color: ${props => props.theme.lightGreen};
  margin-bottom: 18px;
`;

const LikeButton = styled(Button)`
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.black};
  width: 100px;
  height: 40px;
  border: ${props => props.theme.boxBorder};
`;

const HeartIcon = styled(HeartEmpty)`
  margin-right: 7px;
  width: 15px;
  height: 15px;
`;

const ProductInfo = ({ title, description, D_day, tokenId }) => (
  <Container>
    <Link to={`/makers/${tokenId}`}>
      <Title>Title: {title}</Title>
      <Description>Description: {description}</Description>
    </Link>

    <DDay>Token id: {tokenId}</DDay>
    <DDay>D day: {D_day}</DDay>
    {/* <LikeButton>
      <HeartIcon />
      2,000명
    </LikeButton> */}
  </Container>
);

export default ProductInfo;
