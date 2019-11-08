import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blueGrey } from "@material-ui/core/colors";

const Root = styled(Paper)`
  flex-grow: 0;
  width: ${props => props.theme.maxCardWidth};
  min-height: 100%;
`;

const StyledTabs = styled(Tabs)`
  width: ${props => props.theme.maxCardWidth};
  position: fixed;
  z-index: 1;
  background-color: ${props => props.theme.bgColor};
`;

const StyledTab = styled(Tab)`
  width: 20%;
`;

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createMuiTheme({
    palette: {
      primary: { main: blueGrey[900] },
      secondary: { main: "#17202E" }
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "Noto Sans KR",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      fontSize: 16,
      fontWeight: 700
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Root>
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <StyledTab label="홈" />
          <StyledTab label="인기상품" />
          <StyledTab label="마감임박" />
          <StyledTab label="종료상품" />
        </StyledTabs>
      </Root>
    </ThemeProvider>
  );
}
