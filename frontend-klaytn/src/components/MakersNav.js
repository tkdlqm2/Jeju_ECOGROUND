import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blueGrey } from "@material-ui/core/colors";
import MakersFeed from "components/MakersFeed";

const Root = styled(Paper)`
  flex-grow: 0;
  width: ${props => props.theme.maxCardWidth};
  min-height: 100%;
  border: 0 none;
  background-color: ${props => props.theme.bgColor};
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

const StyledBox = styled(Box)`
  border: 0 none;
  background-color: ${props => props.theme.bgColor};
`;

const StyledTypo = styled(Typography)`
  border: 0 none;
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    border: 0
  }
}));

function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, theme, ...other } = props;

  return (
    <ThemeProvider theme={theme}>
      <StyledTypo
        classes="root"
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {/* <StyledBox p={20}>{children}</StyledBox> */}
        <StyledBox p={3}>{children}</StyledBox>
      </StyledTypo>
    </ThemeProvider>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function SimpleTabs() {
  const classes = useStyles();
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
        <AppBar position="relative">
          <StyledTabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            centered
          >
            <StyledTab label="홈" {...a11yProps(0)} />
            <StyledTab label="인기상품" {...a11yProps(1)} />
            <StyledTab label="마감임박" {...a11yProps(2)} />
            <StyledTab label="종료상품" {...a11yProps(3)} />
          </StyledTabs>
        </AppBar>
        <TabPanel value={value} index={0} theme={theme}>
          <MakersFeed index={1} />
        </TabPanel>
        <TabPanel value={value} index={1} theme={theme}>
          <MakersFeed index={2} />
        </TabPanel>
        <TabPanel value={value} index={2} theme={theme}>
          <MakersFeed index={3} />
        </TabPanel>
        <TabPanel value={value} index={3} theme={theme}>
          <MakersFeed index={0} />
        </TabPanel>
      </Root>
    </ThemeProvider>
  );
}
