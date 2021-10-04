import { React, Component } from "react";
import { Switch, Route } from "react-router";
import Dashboard from "./dashboard";
import Error404 from "./error404";
import Login from "./login";
import Products from "./products";
import Suppliers from "./suppliers";
import Transactions from "./transactions";
import Customers from "./users";
export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/customers" component={Customers} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/suppliers" component={Suppliers} />
        <Route exact path="/transactions" component={Transactions} />
        <Route path="*" component={Error404} />
      </Switch>
    );
  }
}
