import React, { useState, useContext } from "react";
import { Context } from "../store/appContext"; 
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { actions } = useContext(Context); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await actions.signup(email, password);
    if (success) {
      navigate("/login"); 
    } else {
      setError("Signup failed. Please try again.");
    }
  };

  const handleGoHome = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>Signup</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <button type="submit" className="btn btn-primary w-100">
                  Sign Up
                </button>
              </form>
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleGoHome}
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;