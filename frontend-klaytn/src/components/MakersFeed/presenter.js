import React from "react";
import ProductInfo from "../ProductInfo";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SliderSet from "components/SliderSet";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeedProduct = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  width: 100%;
  max-width: ${props => props.theme.maxCardWidth};
  margin-bottom: 70px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  img {
    width: 100%;
  }
`;

const InfoContainer = styled.div`
  width: ${props => props.theme.maxCardWidth};
  position: relative;
  padding: 24px 24px 24px 10px;
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

const MakersFeed = props => {
  const { feed } = props;
  console.log(feed);

  const statusOneFeed = [];

  {
    feed !== null &&
      feed.map(item => {
        if (item.status == 1) {
          statusOneFeed.push(item);
        }
      });
  }

  console.log("statusOneFeed: ", statusOneFeed);
  return (
    <Container>
      <FeedContainer>
        {statusOneFeed !== null ? (
          statusOneFeed.map(
            ({
              tokenId,
              buyer,
              photo,
              title,
              description,
              targetKlay,
              price,
              D_day,
              status,
              timestamp
            }) => {
              return (
                <FeedProduct key={tokenId}>
                  <Link to={`/makers/${tokenId}`}>
                    <ImageContainer>
                      <img
                        src={photo}
                        alt={title}
                      />
                    </ImageContainer>
                  </Link>
                  <InfoContainer>
                    <ProductInfo
                      title={title}
                      D_day={D_day}
                      description={description}
                      tokenId={tokenId}
                      price={price}
                    />
                  </InfoContainer>
                  <SliderSet
                    targetKlay={targetKlay}
                    price={price}
                    status={status}
                    D_day={D_day}
                    tokenId={tokenId}
                  />
                </FeedProduct>
              );
            }
          )
        ) : (
          <FeedEmpty>Loading...</FeedEmpty>
        )}
      </FeedContainer>
    </Container>
  );
};

export default MakersFeed;
