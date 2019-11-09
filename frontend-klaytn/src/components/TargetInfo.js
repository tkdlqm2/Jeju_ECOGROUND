import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

// const TodayDate = new Date().toLocaleDateString('se').replace(/\D/g, '')

const date = new Date();
const TodayDate = (date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + (date.getDate())).slice(-2));

const TargetInfo = ({ description, D_day, tokenId }) => (
  <Container>
    <Link to={`/makers/${tokenId}`}>
      <Description>{D_day - TodayDate}일 남음</Description>
      <Description>{tokenId}% 달성</Description>
      <Description>{tokenId}Klay 펀딩</Description>
    </Link>
  </Container>
);

export default TargetInfo;