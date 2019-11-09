import React from "react";
import styled from "styled-components";
import MakersDesc from "components/MakersDesc";
import SubInfo from "components/SubInfo";
import SliderSet from "components/SliderSet";
import OrderButton from "components/OrderButton";
import DeleteButton from "components/DeleteButton";
import MoreButton from "components/MoreButton";

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
  padding: 40px 10px;
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

// const SlideButton = styled.div`
//   cursor: pointer;
//   position: absolute;
//   top: 50%;
//   ${props => (props.type === "prev" ? "left: 10px" : "right: 10px")};
//   opacity: 0.7;
// `;

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
const MakersProduct = ({
  userAddress,
  isLoading,
  likeCount,
  isLiked,
  setIsLiked,
  setLikeCount,
  currentItem,
  toggleLike,
  product
}) => {
  console.log("product!!! : ", product);
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

  const deleteMakers = e => {};

  return (
    <Container>
      <ImageContainer>
        <Image key={tokenId} src={photo} showing={true} />
      </ImageContainer>
      <TitleAndPrice>
        <Title>{title}</Title>
        <PriceLine>
          <Price>{price} KLAY</Price>
          <EcoPower>{price * 10} ECO</EcoPower>
        </PriceLine>
      </TitleAndPrice>

      <ColoredLine />

      <InfoContainer>
        {/* <TargetInfo tokenId={tokenId} description={description} D_day={D_day} /> */}
        <SliderSet
          targetKlay={targetKlay}
          price={price}
          status={status}
          D_day={D_day}
          tokenId={tokenId}
        />
      </InfoContainer>

      <ColoredLine />

      <InfoContainer>
        <SubInfo tokenId={tokenId} D_day={D_day} targetKlay={targetKlay} />
      </InfoContainer>

      <ColoredLine />

      <InfoContainer>
        <MakersDesc
          tokenId={tokenId}
          description={description}
          title={title}
          D_day={D_day}
        />
      </InfoContainer>

      <MoreButton />

      <DeleteButton tokenId={tokenId} />

      <OrderButton userAddress={userAddress} tokenId={tokenId} />
    </Container>
  );
};

export default MakersProduct;
