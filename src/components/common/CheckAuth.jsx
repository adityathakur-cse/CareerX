import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  console.log(location.pathname);

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("login") ||
      location.pathname.includes("register")
    )
  ) {
    return <Navigate to={"/auth/login"} />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("login") ||
      location.pathname.includes("register"))
  ) {
    if (user.role == "STUDENT") {
      console.log("Hey");
      return <Navigate to={"/student/dashboard"} />;
    } else {
      console.log("bhj");
      return <Navigate to={"/company/dashboard"} />;
    }
  }

  return <>{children}</>;
};

export default CheckAuth;
