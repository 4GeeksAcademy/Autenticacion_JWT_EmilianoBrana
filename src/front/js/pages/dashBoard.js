import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

const Dashboard = () => {
  const { store, actions } = useContext(Context); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (store.user) {
      setUser(store.user); 
    } else {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      if (storedUser) {
        actions.setStore({ user: storedUser }); 
        setUser(storedUser); 
      }
    }
  }, [store.user, actions]); 

  if (!user) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container mt-5">
      <h1>Welcome to your Dashboard</h1>
      <h3>Hello, {user.email}</h3> 
    </div>
  );
};

export default Dashboard;