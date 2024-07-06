import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";

const PrivateRoute = (props) => {
  const { children } = props;
  const { activeUser } = useAuthContext();

  if (activeUser) {
    return <>{children}</>;
  }

  const redirectPath = "/Sign-In";
  return <Navigate to={redirectPath} />;
};

export default PrivateRoute;
