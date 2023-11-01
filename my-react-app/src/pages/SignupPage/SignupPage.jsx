import React, { useState } from "react";
import "./SignupPage.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState(""); // New state for Username
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = () => {
    // Here you can perform password encoding and signup logic
    // For simplicity, let's just log the values
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    navigate('/journey');
  };

  return (
    <div className="signup">
      <div className="div">
        <div className="text-wrapper">Sign Up</div>
        <div className="text">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="first-name-input" // Add this class
          />
        </div>
        <div className="text">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="last-name-input" // Add this class
          />
        </div>
        <div className="text">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="username-input" // Add this class
          />
        </div>
        <div className="text">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="password-input"
          />
        </div>
        <div className="text">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="confirm-password-input"
          />
        </div>
        <div className="overlap-group-2">
          <button className="text-wrapper-5" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
