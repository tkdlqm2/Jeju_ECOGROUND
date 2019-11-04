import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "pages/Auth";
import Home from "pages/Home";
import Makers from "pages/Makers";
import Wallet from "pages/Wallet";
import MakersDetail from "pages/MakersDetail";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/makers/:tokenId" component={MakersDetail} />
    <Route path="/makers" component={Makers} />
    <Route path="/wallet" component={Wallet} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
