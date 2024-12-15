import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import SignupForm from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashBoard";
import injectContext from "./store/appContext";

import Navbar from "./component/navbar";
import { Footer } from "./component/footer";
import Private from "./component/private";
import { Context } from "./store/appContext"; 

const Layout = () => {
  const { store, actions } = useContext(Context); 
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") {
    return <BackendURL />;
  }

  useEffect(() => {
    console.log(actions);
    const user = sessionStorage.getItem("user");
    if (user && !store.user) {
      actions.setStore({ user: JSON.parse(user) }); 
    }
  }, [actions, store.user]);  
  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<SignupForm />} path="/signup" />
            <Route element={<Login />} path="/login" />
            <Route
              path="/dashboard"
              element={
                <Private>
                  <Dashboard />
                </Private>
              }
            />
            <Route path="*" element={<h1>Not Found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);