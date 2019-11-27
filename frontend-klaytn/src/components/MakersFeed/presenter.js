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
        {feed &&
          feed.map(
            ({ tokenId, photo, title, description, price, D_day, status }) => {
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
                      price={price}
                    />
                  </InfoContainer>
                </FeedProduct>
              );
            }
          )}
      </FeedContainer>
    </Container>
  );
};

MakersFeed.defaultProps = {
  photo:
    "https://1.bp.blogspot.com/-y1m-3XnfuPg/XcEykIQLkNI/AAAAAAAAAB0/R3q6WDU_9zwbLtwEoeyqehUH_PPz3SdogCLcBGAsYHQ/s1600/Repurposed%2Bvinyl%2Bwallet.png"
};

export default MakersFeed;
