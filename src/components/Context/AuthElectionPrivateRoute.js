import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useElectionContext } from "./ElectionContext";

const AuthElectionPrivateRoute = ({ component: Component, ...rest }) => {
  const { currentElection } = useElectionContext();
  const { currentUser, userID } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentElection.userId === userID ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        );
      }}
    ></Route>
  );
};

export default AuthElectionPrivateRoute;
