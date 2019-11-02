import React from "react";
// import moment from "moment";
// import ProductInfo from "../ProductInfo";
import { drawImageFromBytes } from "../../utils/imageUtils";
import styled from "styled-components";

const FeedProduct = styled.div`
  position: relative;
  width: 100%;
  max-width: $max-card-width;
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
  padding: 24px 24px 40px 24px;
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
    <FeedContainer>
      {feed !== null ? (
        feed.map(({ id, data, name, caption, timestamp }) => {
          const imageUrl = drawImageFromBytes(data);
          //   const issueDate = moment(timestamp * 1000).fromNow();
          return (
            <FeedProduct key={id}>
              <ImageContainer>
                <img src={imageUrl} alt={name} />
              </ImageContainer>
              <InfoContainer>
                info
                {/* <ProductInfo
                  name={name}
                  issueDate={issueDate}
                  caption={caption}
                /> */}
              </InfoContainer>
            </FeedProduct>
          );
        })
      ) : (
        <FeedEmpty>No Product :D</FeedEmpty>
      )}
    </FeedContainer>
  );
};

export default MakersFeed;
