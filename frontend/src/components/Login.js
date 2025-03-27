import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authslice"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/login.css";

export default function Login() {
  const [email, setEmail] = useState(""); // State to store user email input
  const [password, setPassword] = useState(""); // State to store user password input
  const [error, setError] = useState(""); // State to handle error messages
  const navigate = useNavigate(); // Hook to navigate to different routes
  const dispatch = useDispatch(); // Hook to dispatch actions to Redux store

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before making a request

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Send user credentials
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error); // Display error message if login fails
      } else {
        // Dispatch login action to update Redux store with user details
        dispatch(loginSuccess({ token: data.token, user: data.user }));

        // Redirect to home page after successful login
        navigate("/");
      }
    } catch (error) {
      setError("An error occurred. Please try again."); // Generic error message
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row justify-content-center" style={{ width: "100%" }}>
        <div className="col-md-6">
          <div className="authenticateBox">
            <h4 className="text-center">Login</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state on change
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state on change
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>} {/* Display error message if any */}
              <button type="submit" className="btn btn-pink btn-block mt-3">
                Login
              </button>
            </form>
            <p>
              Don't have an account? <Link to="/register">Create Account</Link> {/* Link to register page */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
