import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext"; 

const Private = ({ children }) => {
  const { store } = useContext(Context); 

  if (!store.user) {
    return <Navigate to="/login" />;
  }

  return children; 
};

export default Private;