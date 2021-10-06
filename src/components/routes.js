import { React, Component } from "react";
import { Switch, Route } from "react-router";
import Dashboard from "./dashboard";
import Error404 from "./error404";
import Login from "./login";
import Products from "./products";
import Suppliers from "./suppliers";
import Transactions from "./transactions";
import Customers from "./users";

import { useAuth } from "./Context/AuthContext";
import PrivateRoute from "./Context/PrivateRoute";

export default function Routes (){
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/customers" component={Customers} />
        <PrivateRoute exact path="/products" component={Products} />
        <PrivateRoute exact path="/suppliers" component={Suppliers} />
        <PrivateRoute exact path="/transactions" component={Transactions} />
        <Route path="*" component={Error404} />
      </Switch>
    );
}
