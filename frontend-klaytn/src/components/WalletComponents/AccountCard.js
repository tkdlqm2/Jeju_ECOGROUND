import React from "react";
import styled from "styled-components";
import CardGiftcardRoundedIcon from "@material-ui/icons/CardGiftcardRounded";
import CachedIcon from "@material-ui/icons/Cached";
import CreditCardIcon from "@material-ui/icons/CreditCard";

const Container = styled.div`
  width: 540px;
  height: 350px;
  display: flex;
  position: relative;
  top: 40px;
  ${props => props.theme.whiteBox};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const KlayBalance = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
`;

const Span = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const EcoData = styled.div`
  height: 250;
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
`;

const IconDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

const IconDesc = styled.div``;

const Balance = styled.div`
  margin-top: 10px;
  color: ${props => props.theme.lightGreen};
  font-weight: 600;
  font-size: 14px;
`;

export default ({ balance }) => {
  return (
    <Container>
      <KlayBalance>
        <Span>My Total Balance</Span>
        <Span>{balance} Klay</Span>
      </KlayBalance>
      <EcoData>
        <Item>
          <IconContainer>
            <CardGiftcardRoundedIcon style={{ fontSize: 40 }} />
          </IconContainer>
          <IconDescContainer>
            <IconDesc>Eco Power</IconDesc>
            <Balance>3000ECO</Balance>
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
};
