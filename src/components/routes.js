import { React, Component } from "react";
import { Switch, Route } from "react-router";
import Dashboard from "./dashboard";
import Error404 from "./error404";
import Login from "./login";
import Products from "./products";
import Suppliers from "./suppliers";
import Transactions from "./transactions";
import Users from "./users";
import { AuthProvider } from "./Context/AuthContext";
export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <AuthProvider>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/suppliers" component={Suppliers} />
          <Route exact path="/transactions" component={Transactions} />
          <Route path="*" component={Error404} />
        </AuthProvider>
      </Switch>
    );
  }
}
