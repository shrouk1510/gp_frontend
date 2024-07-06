import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";

const AdminRoute = (props) => {
  const { children } = props;
  const { activeUser, role } = useAuthContext();

  if (!activeUser && role  !== "ADMIN") {
    return <>{children}</>;
  }

  const redirectPath = "/Sign-In";
  return <Navigate to={redirectPath} />;
};

export default AdminRoute;
