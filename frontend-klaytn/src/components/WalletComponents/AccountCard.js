import React, { useEffect, useState, Component } from "react";
import styled from "styled-components";
import CardGiftcardRoundedIcon from "@material-ui/icons/CardGiftcardRounded";
import CachedIcon from "@material-ui/icons/Cached";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EcoTokenContract from "klaytn/EcoTokenContract";

const Container = styled.div`
  width: 540px;
  height: 300px;
  display: flex;
  position: relative;
  top: 60px;
  ${props => props.theme.whiteBox};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const KlayBalance = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 60px;
`;

const Span = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const EcoData = styled.div`
  height: 240px;
  width: 95%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.div`
  font-size: 40px;
  cursor: pointer;
`;

const IconDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

const IconDesc = styled.div`
  cursor: pointer;
`;

const Balance = styled.div`
  margin-top: 10px;
  color: ${props => props.theme.lightGreen};
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
`;

const GreenText = styled.span`
  color: ${props => props.theme.lightGreen};
  font-size: 28px;
`;

class AccountCard extends Component {
  state = {
    ecoPower: 0
  };
  _showMyToken = addressId => {
    console.log("_showMyToken 호출", addressId);

    EcoTokenContract.methods
      .balanceOf(addressId)
      .call()
      .then(result => {
        console.log("총 보유 Eco Token : ", result);
        this.setState({
          ecoPower: result
        });
      });
  };

  constructor(props) {
    super(props);
    const { address } = props;
    this._showMyToken(address);
  }

  render() {
    const { balance, ecoPower } = this.props;
    const balanceFloor = Math.floor(balance * 10000) / 10000;

    return (
      <Container>
        <KlayBalance>
          <Span>My Total Balance</Span>
          <Span>
            <GreenText>{balanceFloor} </GreenText> KLAY
          </Span>
        </KlayBalance>
        <EcoData>
          <Item>
            <IconContainer>
              <CardGiftcardRoundedIcon style={{ fontSize: 40 }} />
            </IconContainer>
            <IconDescContainer>
              <IconDesc>Eco Power</IconDesc>
              <Balance>{this.state.ecoPower} ECO</Balance>
            </IconDescContainer>
          </Item>
          <Item>
            <IconContainer>
              <CreditCardIcon style={{ fontSize: 40 }} />
            </IconContainer>
            <IconDescContainer>
              <IconDesc>Card</IconDesc>
              <Balance>100ECO</Balance>
            </IconDescContainer>
          </Item>
          <Item>
            <IconContainer>
              <CachedIcon style={{ fontSize: 40 }} />
            </IconContainer>
            <IconDescContainer>
              <IconDesc>Reward</IconDesc>
              <Balance>200ECO</Balance>
            </IconDescContainer>
          </Item>
        </EcoData>
      </Container>
    );
  }
}

export default AccountCard;