import React from "react";
import { AuthAPI } from "../apis/authAPI";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};
const Protected: React.FC<Props> = ({ children }) => {

  const user = AuthAPI.getUser();
  
  if (!user || !user.token || !user.expiresAt || Date.now() / 1000 > user.expiresAt) {
    localStorage.clear();
    return <Navigate to="/login" />;
}

  return <div>{children}</div>;
};

export default Protected;
