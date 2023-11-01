import React, { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted credentials:", username, password);

    // TODO: Handle authentication logic here
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
        <div className="overlap-3">
          <img
            className="img"
            alt="Rectangle"
            src="https://cdn.animaapp.com/projects/65408ceb2ddc83e6bd71570e/releases/65408e081cff822e1265c0f3/img/rectangle-8.svg"
          />
          <Link to="/signup" className="text-wrapper-4">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
