import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export function PrivateRoute({ children, allowedRoles, ...others }) {
  const { currentUser, isUserLoaded } = useAuth();

  if (!isUserLoaded) {
    return <div>loading...</div>;
  }
  return (
    <React.Fragment>
      {currentUser ? (
        <Route {...others}>{children}</Route>
      ) : (
        <Redirect to="/login" />
      )}
    </React.Fragment>
  );
}
