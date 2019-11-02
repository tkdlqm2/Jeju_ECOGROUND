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

const data = [
  {
    tokenId: 1,
    buyer: "buyer",
    photo: "",
    title: "Bamboo Keyboard",
    description: "a keyboard made of bamboo material",
    targetKlay: 59900,
    D_day: "191130",
    status: 0,
    timestamp: "191101"
  },
  {
    tokenId: 2,
    buyer: "buyer",
    photo: "",
    title: "Bamboo Umbrella",
    description: "an umbrella made of bamboo material",
    targetKlay: 29900,
    D_day: "191130",
    status: 0,
    timestamp: "191101"
  },
  {
    tokenId: 3,
    buyer: "buyer",
    photo: "",
    title: "Hardwood Speaker",
    description: "a speaker made of hardwood material",
    targetKlay: 199000,
    D_day: "191130",
    status: 0,
    timestamp: "191101"
  },
  {
    tokenId: 4,
    buyer: "buyer",
    photo: "",
    title: "Solar Cooker",
    description: "an oven that uses solar heat",
    targetKlay: 599000,
    D_day: "191130",
    status: 0,
    timestamp: "191101"
  },
  {
    tokenId: 5,
    buyer: "buyer",
    photo: "",
    title: "Eco Crayons",
    description: "crayons made of eco-friendly materials",
    targetKlay: 9900,
    D_day: "191130",
    status: 0,
    timestamp: "191101"
  }
];

const MakersFeed = props => {
  const { feed } = props;
  console.log(feed);
  return (
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
            // const imageUrl = drawImageFromBytes(data);
            //   const issueDate = moment(timestamp * 1000).fromNow();
            return (
              <FeedProduct key={tokenId}>
                <ImageContainer>
                  {/* <img src={imageUrl} alt={title} /> */}
                </ImageContainer>
                <InfoContainer>
                  {buyer} / {title} / {description} / {targetKlay} / {D_day} /{" "}
                  {status}
                  {timestamp}/
                  {/* <ProductInfo
                  name={name}
                  issueDate={issueDate}
                  caption={caption}
                /> */}
                </InfoContainer>
              </FeedProduct>
            );
          }
        )
      ) : (
        <FeedEmpty>No Product :D</FeedEmpty>
      )}
    </FeedContainer>
  );
};

export default MakersFeed;
