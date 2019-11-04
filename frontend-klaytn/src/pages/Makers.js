import React from "react";
import styled from "styled-components";
import MakersFeed from "components/MakersFeed";
import MakersNav from "components/MakersNav";
import MakersHeader from "components/MakersHeader";

const Container = styled.main`
  width: 100%;
  min-height: 100%;
  min-width: ${props => props.theme.maxCardWidth};
  max-width: ${props => props.theme.maxCardWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default () => (
  <Container>
    <MakersHeader />
    <MakersNav />
    <MakersFeed />
  </Container>
);
