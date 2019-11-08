import React from "react";
import ProductInfo from "../ProductInfo";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Slider from "components/Slider";

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
  margin-bottom: 60px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ImageContainer = styled.div`
  margin-top: 20px;
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
                        src={
                          "https://1.bp.blogspot.com/-asYYjf83Gno/XcEyk217XrI/AAAAAAAAAB8/hiwnkFubUfMAQdG7OaghUG5B1DELPs1qACLcBGAsYHQ/s1600/paper%2Bcosmetics.jpg"
                        }
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
                    />
                  </InfoContainer>
                  <Slider
                    targetKlay={targetKlay}
                    price={price}
                    status={status}
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
