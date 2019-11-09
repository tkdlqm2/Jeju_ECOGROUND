import React, { useEffect, useState, Component } from "react";
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

class SliderSet extends Component {
  state = {
    targetKlay: 0,
    donate: 0
  };

  _showTargetKlay = tokenId => {
    MakersContract.methods
      .showTargetKlay(tokenId)
      .call()
      .then(targetKlay => {
        if (!targetKlay) {
          return 0;
        }
        this.setState({
          targetKlay
        });
      });
  };

  _checkDonate = tokenId => {
    console.log("checkNodate 호출");

    MakersContract.methods
      .parentStateMakers(tokenId)
      .call()
      .then(donate => {
        if (!donate) {
          return 0;
        }
        this.setState({
          donate
        });
      });
  };

  constructor(props) {
    super(props);
    const { tokenId } = props;
    this._showTargetKlay(tokenId);
    this._checkDonate(tokenId);
  }

  render() {
    const { tokenId, price, status, D_day } = this.props;

    const dayGap = new Date(D_day) - new Date();
    const daySeconds = 24 * 60 * 60 * 1000;
    const dateGap = parseInt(dayGap / daySeconds) + 1;
    return (
      <>
        <SliderInfo>
          <First>
            <BoldText>{this.state.donate} KLAY 달성</BoldText>
            <GreyText>목표금액 {this.state.targetKlay}KLAY</GreyText>
          </First>
          <Second>
            <BoldText>{dateGap} 일 남음</BoldText>
            <GreyText>{D_day} 마감</GreyText>
          </Second>
        </SliderInfo>
        {this.state.targetKlay && this.state.donate && (
          <Slider
            targetKlay={this.state.targetKlay}
            price={price}
            status={status}
            donate={this.state.donate}
          />
        )}
      </>
    );
  }
}

export default SliderSet;
