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
      <div className="div">
        <div className="text-wrapper">IDCollege</div>
        <form onSubmit={handleSubmit}>
          <div className="overlap-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="rectangle"
            />
          </div>
          <div className="overlap">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="rectangle"
            />
          </div>
          <div className="overlap-2" onClick={handleSubmit}>
            <div className="rectangle-2" />
            <div className="text-wrapper-3">Login</div>
          </div>
        </form>
        <div className="overlap-3" onClick={handleButtonClick}>
          <div className="rectangle-2" />
          <div className="text-wrapper-3">Sign Up</div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
