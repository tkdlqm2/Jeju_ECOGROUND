import React from "react";
import * as URL from "../constants/url";
import styled from "styled-components";

const Container = styled.footer`
  width: "100%";
  height: "104px";
`;

const FooterInner = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  height: 100%;
  padding: 0 20px;
  margin: 0 auto;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${props => props.theme.middleGrey};
`;

const LinkBox = styled.ul`
  float: left;
`;

const Link = styled.li`
  display: inline-block;
  margin-right: 16px;
  line-height: 104px;
  color: ${props => props.theme.black};
  cursor: pointer;
`;

const Copyright = styled.div`
  float: right;
  line-height: 104px;
  font-weight: normal;
`;

const footerLinks = [
  { title: "Klaytn Official Site", link: URL.KLAYTN_HOMEPAGE },
  { title: "Klaytnscope", link: URL.KLAYTN_SCOPE },
  { title: "Klaytn Wallet", link: URL.KLAYTN_WALLET },
  { title: "Klaytn Docs", link: URL.KLAYTN_DOCS },
  { title: "Ground X Official Site", link: URL.GROUNDX_HOMEPAGE }
];

const Footer = () => (
  <Container>
    <FooterInner>
      <LinkBox>
        {footerLinks.map(({ title, link }) => (
          <Link key={title}>
            <a href={link} target="_blank" rel="noreferrer noopener">
              {title}
            </a>
          </Link>
        ))}
      </LinkBox>
      <Copyright>&copy; 2019 Eco Ground</Copyright>
    </FooterInner>
  </Container>
);

export default Footer;
