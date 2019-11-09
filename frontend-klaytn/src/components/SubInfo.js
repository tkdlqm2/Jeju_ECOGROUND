import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MakersContract from "klaytn/MakersContract";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.theme.maxCardWidth};
`;

const TargetDescription = styled.p`
  width: 96%;
  font-size: 18px;
  margin-bottom: 12px;
  font-weight: 600;
  line-height: 160%;
  color: #03a87c;
`;

const Description = styled.p`
  width: 96%;
  font-size: 14px;
  font-weight: 100;
  line-height: 140%;
`;

const ColoredBox = styled.div`
  /* background-color:#E5FAF6; */
  padding: 20px;
`;

export default ({ tokenId, D_day }) => {
  const [targetKlay, setTargetKlay] = useState("");
  const [donate, setDonate] = useState(0);

  const dayGap = new Date(D_day) - new Date();
  const daySeconds = 24 * 60 * 60 * 1000;
  const dateGap = parseInt(dayGap / daySeconds) + 1;

  const _showTargetKlay = tokenId => {
    MakersContract.methods
      .showTargetKlay(tokenId)
      .call()
      .then(targetKlay => {
        if (!targetKlay) {
          return 0;
        }
        setTargetKlay(targetKlay);
      });
  };

  const _checkDonate = tokenId => {
    console.log("checkNodate 호출");

    MakersContract.methods
      .parentStateMakers(tokenId)
      .call()
      .then(donate => {
        if (!donate) {
          return 0;
        }
        setDonate(donate);
      });
  };

  useEffect(() => {
    if (tokenId) {
      _showTargetKlay(tokenId);
      _checkDonate(tokenId);
    } else {
      console.log("no token id ");
    }
  }, [tokenId]);

  return(
  <Container>
    <ColoredBox>
      <TargetDescription>목표금액 : {targetKlay}KLAY</TargetDescription>
      <TargetDescription>펀딩기간 : {D_day}까지</TargetDescription>
      <Description>
        100% 이상 모이면 펀딩이 성공되는 프로젝트<br />
        이 프로젝트는 펀딩 마감일까지 목표 금액이 100% 모이지 않으면
        결제가 진행되지 않습니다.
      </Description>
    </ColoredBox>
  </Container>
  )
};

