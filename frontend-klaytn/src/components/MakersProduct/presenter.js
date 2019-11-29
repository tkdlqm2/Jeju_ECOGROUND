import React from "react";
import styled from "styled-components";
import MakersDesc from "components/MakersDesc";
import SubInfo from "components/SubInfo";
import SliderSet from "components/SliderSet";
import OrderButton from "components/OrderButton";
import DeleteButton from "components/DeleteButton";

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  padding-bottom: 80%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
  width: 100%;
  max-width: ${props => props.theme.maxCardWidth};
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 40px;
`;

const Image = styled.div`
  width: 100%;
  height: 500px;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.2s linear;
`;

const ColoredLine = styled.hr`
  border: 0.5px solid ${props => props.theme.lightGrey};
  width: 100%;
`;

const TitleAndPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 25px 10px;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const PriceLine = styled.div``;

const Price = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const EcoPower = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #03a87c;
`;
const MakersProduct = ({ userAddress, product }) => {
  const { ...item } = product;
  const {
    tokenId,
    description,
    status,
    targetKlay,
    title,
    photo,
    D_day,
    price
  } = item;

  return (
    <Container>
      <ImageContainer>
        <Image key={tokenId} src={photo} showing={true} />
      </ImageContainer>
      <TitleAndPrice>
        <Title>{title}</Title>
        <PriceLine>
          <Price>{price} KLAY</Price>
          <EcoPower>{price * 10} Bean</EcoPower>
        </PriceLine>
      </TitleAndPrice>

      {/* <ColoredLine />

      <InfoContainer>
        {product && (
          <SliderSet
            targetKlay={targetKlay}
            price={price}
            status={status}
            D_day={D_day}
            tokenId={tokenId}
          />
        )}
      </InfoContainer>

      <ColoredLine /> */}
      {/* 
      <InfoContainer>
        {product && (
          <SubInfo tokenId={tokenId} D_day={D_day} targetKlay={targetKlay} />
        )}
      </InfoContainer> */}

      <ColoredLine />

      <InfoContainer>
        <MakersDesc
          tokenId={tokenId}
          description={description}
          title={title}
          D_day={D_day}
        />
      </InfoContainer>

      {userAddress === "0xb080c3403565f1d4dad3f705796f8f994d1c2105" && (
        <DeleteButton tokenId={tokenId} />
      )}

      <OrderButton userAddress={userAddress} tokenId={tokenId} />
    </Container>
  );
};

export default MakersProduct;
