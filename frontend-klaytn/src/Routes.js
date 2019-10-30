import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
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
