import React from "react";
import ProductInfo from "../ProductInfo";
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
  padding: 24px 24px 40px 10px;
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
  return (
    <Container>
      <FeedContainer>
        {feed !== null ? (
          feed.map(
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
