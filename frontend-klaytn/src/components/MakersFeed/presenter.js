import React from "react";
// import moment from "moment";
import ProductInfo from "../ProductInfo";
import MakersHeader from "components/MakersHeader";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeedProduct = styled.div`
  position: relative;
  width: 100%;
  max-width: ${props => props.theme.maxCardWidth};
  margin-bottom: 60px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`;

const InfoContainer = styled.div`
  position: relative;
  padding: 24px 24px 40px 14px;
`;

const FeedEmpty = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const FeedContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const data = [
  {
    tokenId: 1,
    buyer: "buyer",
    title: "대나무 키보드",
    description: "대나무로 만들어진 키보드입니다",
    targetKlay: 59900,
    D_day: "11월 30일까지",
    status: 0,
    timestamp: "191101",
    photo:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcRt57N%2Fbtqzu8YJOmH%2FmSW7bQjs5SaAAOiv7GNb8k%2Fimg.jpg"
  },
  {
    tokenId: 2,
    buyer: "buyer",
    title: "Bamboo Umbrella",
    description: "an umbrella made of bamboo material",
    targetKlay: 29900,
    D_day: "191130",
    status: 0,
    timestamp: "191101",
    photo:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FyVX6W%2FbtqzvqrjME6%2FvZuVcZkxK4d1zMaapS6Skk%2Fimg.png"
  },
  {
    tokenId: 3,
    buyer: "buyer",
    title: "Hardwood Speaker",
    description: "a speaker made of hardwood material",
    targetKlay: 199000,
    D_day: "191130",
    status: 0,
    timestamp: "191101",
    photo:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcYQGlp%2Fbtqzwveo94T%2FVAqupXycfgBzobZtt8r5T0%2Fimg.png"
  },
  {
    tokenId: 4,
    buyer: "buyer",
    title: "Solar Cooker",
    description: "an oven that uses solar heat",
    targetKlay: 599000,
    D_day: "191130",
    status: 0,
    timestamp: "191101",
    photo:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcRt57N%2Fbtqzu8YJOmH%2FmSW7bQjs5SaAAOiv7GNb8k%2Fimg.jpg"
  },
  {
    tokenId: 5,
    buyer: "buyer",
    title: "Eco Crayons",
    description: "crayons made of eco-friendly materials",
    targetKlay: 9900,
    D_day: "191130",
    status: 0,
    timestamp: "191101",
    photo:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fcqs90m%2FbtqzuRiBtZI%2FE5ECeiub5dnzA78kFqV9NK%2Fimg.png"
  }
];

const MakersFeed = props => {
  const { feed } = props;
  console.log(feed);
  return (
    <Container>
      <MakersHeader />
      <FeedContainer>
        {data !== null ? (
          data.map(
            ({
              tokenId,
              buyer,
              photo,
              title,
              description,
              targetKlay,
              D_day,
              status,
              timestamp
            }) => {
              return (
                <FeedProduct key={tokenId}>
                  <Link to={`/makers/${tokenId}`}>
                    <ImageContainer>
                      <img src={photo} alt={title} />
                    </ImageContainer>
                  </Link>
                  <InfoContainer>
                    <ProductInfo
                      title={title}
                      D_day={D_day}
                      description={description}
                      tokenId={tokenId}
                    />
                  </InfoContainer>
                </FeedProduct>
              );
            }
          )
        ) : (
          <FeedEmpty>No Product :D</FeedEmpty>
        )}
      </FeedContainer>
    </Container>
  );
};

export default MakersFeed;
