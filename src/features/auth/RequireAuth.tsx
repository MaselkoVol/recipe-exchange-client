import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { RootState } from "../../app/store";
type Props = {};

const RequireAuth = (props: Props) => {
  const token = useSelector((selector: RootState) => selector.auth.token);
  const location = useLocation();
  return token !== null ? <Outlet /> : <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default RequireAuth;
