import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.theme.maxCardWidth};
`;

const TargetDescription = styled.p`
  width: 96%;
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: 100;
  line-height: 160%;
  color:#03A87C;
`;

const Description = styled.p`
  width: 96%;
  font-size: 14px;
  font-weight: 100;
  line-height: 140%;
`;

const ColoredBox = styled.div`
    background-color:#E5FAF6;
    padding:20px;
`;

const SubInfo = ({ D_day, tokenId, targetKlay }) => (
  <Container>
    <ColoredBox>
    <Link to={`/makers/${tokenId}`}>
      <TargetDescription>목표금액 : {targetKlay}Klay</TargetDescription>
      <TargetDescription>펀딩기간 : {D_day}까지</TargetDescription>
      <Description>100% 이상 모이면 펀딩이 성공되는 프로젝트<br/>
        이 프로젝트는 펀딩 마감일까지 목표 금액이 100% 모이지 않으면 결제가 진행되지 않습니다.</Description>
    </Link>
    </ColoredBox>  
  </Container>
);

export default SubInfo;
