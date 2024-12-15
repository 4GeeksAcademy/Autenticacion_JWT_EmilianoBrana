import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

const Navbar = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Brand/Home Link */}
      <Link className="navbar-brand" to="/">
        MyApp
      </Link>

      <div className="ml-auto">
        {location.pathname === "/" ? (
          // Show Login and Sign Up buttons only on the Home page
          <>
            <Link to="/login" className="btn btn-primary mx-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-secondary mx-2">
              Sign Up
            </Link>
          </>
        ) : (
          // Show Logout button on other pages
          <>
            {store.user ? (
              <button
                className="btn btn-danger mx-2"
                onClick={() => {
                  actions.logout();
                }}
              >
                Logout
              </button>
            ) : null}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;