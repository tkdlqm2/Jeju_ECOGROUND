import React from "react";
import MakersFeed from "../components/MakersFeed";
import styled from "styled-components";
import UploadButton from "../components/UploadButton";

const Container = styled.main`
  width: 100%;
  min-height: 100%;
  min-width: $min-page-width;
  max-width: $max-page-width;
  margin: 0 auto;
`;

const Makers = () => (
  <Container>
    <MakersFeed />
    <UploadButton />
  </Container>
);

export default Makers;
