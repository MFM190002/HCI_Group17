import React, { useState } from "react";
import "./LoginPage.css";
import {  useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted credentials:", username, password);

    // TODO: Handle authentication logic herenp
  };

  const handleButtonClick = () => {
    navigate("/signup");
  };

  return (
    <div className="login">
      <div className="login-div">
        <div className="login-IDCollege-text">IDCollege</div>
        <form onSubmit={handleSubmit}>
          <div className="login-username">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="login-rectangle"
            />
          </div>
          <div className="login-password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="login-rectangle"
            />
          </div>
          <div className="login-button" onClick={handleSubmit}>
            <div className="login-rectangle2" />
            <div className="login-button-text">Login</div>
          </div>
        </form>
        <div className="signup-button" onClick={handleButtonClick}>
          <div className="login-rectangle2" />
          <div className="login-button-text">Sign Up</div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
