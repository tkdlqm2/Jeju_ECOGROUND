import React from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import { HeartFull } from "../Icons";
import MakersDesc from "components/MakersDesc";
import TargetInfo from "components/TargetInfo";
import SubInfo from "components/SubInfo";
import SliderSet from "components/SliderSet";

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

const LikeButton = styled.span`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.headerColor};
`;

const Order = styled.div`
  display: grid;
  grid-template-columns: 4fr 9fr;
  height: 65px;
  width: 100%;
  position: fixed;
  bottom: 0;
  max-width: ${props => props.theme.maxCardWidth};
`;

const LikeText = styled.div`
  font-size: 10px;
  margin-top: 8px;
  font-weight: 200;
  color: ${props => props.theme.white};
`;

const OrderText = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.white};
`;

const OrderButton = styled.span`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.lightGreen};
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

const Price = styled.div`
  font-size: 20px;
  font-weight: 600;
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
        <Image
          key={tokenId}
          src={
            "https://1.bp.blogspot.com/-asYYjf83Gno/XcEyk217XrI/AAAAAAAAAB8/hiwnkFubUfMAQdG7OaghUG5B1DELPs1qACLcBGAsYHQ/s1600/paper%2Bcosmetics.jpg"
          }
          showing={true}
        />
      </ImageContainer>
      <TitleAndPrice>
        <Title>{title}</Title>
        <Price>{price} KLAY</Price>
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

      <Order>
        <LikeButton>
          <HeartFull />
          <LikeText>좋아요</LikeText>
        </LikeButton>
        <OrderButton>
          <OrderText>신청하기</OrderText>
        </OrderButton>
      </Order>
    </Container>
  );
};

export default MakersProduct;
