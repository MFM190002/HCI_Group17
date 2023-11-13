import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted credentials:", username, password);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      // If the response is successful, navigate to /home
      navigate(`/home?username=${username}`);
    } catch (error) {
      // If an error occurs, handle it and set the error state
      console.error("Authentication error:", error);
      setError("Invalid username or password");
    }
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
          {error && <div className="error-message">{error}</div>}
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
