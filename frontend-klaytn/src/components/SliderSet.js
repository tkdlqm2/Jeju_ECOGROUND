import React, { useEffect, useState } from "react";
import Slider from "components/Slider";
import styled from "styled-components";
import MakersContract from "klaytn/MakersContract";

const SliderInfo = styled.div`
  width: 97%;
`;

const BoldText = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
`;
const GreyText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.brownGrey};
`;
const First = styled.div`
  margin-bottom: 10px;
`;
const Second = styled.div``;

export default ({ tokenId, price, status, D_day }) => {
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

  return (
    <>
      <SliderInfo>
        <First>
          <BoldText>{donate} KLAY 달성</BoldText>
          <GreyText>목표금액 {targetKlay}KLAY</GreyText>
        </First>
        <Second>
          <BoldText>{dateGap} 일 남음</BoldText>
          <GreyText>{D_day} 마감</GreyText>
        </Second>
      </SliderInfo>
      <Slider
        targetKlay={targetKlay}
        price={price}
        status={status}
        donate={donate}
      />
    </>
  );
};