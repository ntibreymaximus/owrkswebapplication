import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./src/components/dashboard";
import Login from "./src/components/login";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    );
  }
}
