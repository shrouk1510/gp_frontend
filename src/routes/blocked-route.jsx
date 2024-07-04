import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";

const BlockedRoute = (props) => {
  const { children } = props;
  const { activeUser } = useAuthContext();

  if (!activeUser) {
    return <>{children}</>;
  }

  const redirectPath = "/Registed";
  return <Navigate to={redirectPath} />;
};

export default BlockedRoute;
