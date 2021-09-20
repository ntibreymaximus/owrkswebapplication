import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useElectionContext } from "./ElectionContext";

const ElectionPrivateRoute = ({ component: Component, ...rest }) => {
  const { currentElection, voter } = useElectionContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        return (currentElection && voter) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/election" />
        );
      }}
    ></Route>
  );
};

export default ElectionPrivateRoute;
