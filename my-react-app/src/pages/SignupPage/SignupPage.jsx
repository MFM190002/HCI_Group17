import React, { useState } from "react";
import "./SignupPage.css";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // New state for password error
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError(""); // Clear the error if passwords match
      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);
      console.log("Username:", username);
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);
      navigate(`/journey?username=${username}`);
    }
  };

  return (
    <div className="signup">
      <div className="signup-div">
        <div className="signup-header">Sign Up</div>
        <div className="signup-text">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="first-name-input"
          />
        </div>
        <div className="signup-text">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="last-name-input"
          />
        </div>
        <div className="signup-text">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="username-input"
          />
        </div>
        <div className="signup-text">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="password-input"
          />
        </div>
        <div className="signup-text">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="confirm-password-input"
          />
          {passwordError && <p className="password-error">{passwordError}</p>}
        </div>
        <div className="signuppage-button" onClick = {handleSignup}>
          <div className="signup-rectangle" />
          <div className="signup-button-text">Sign Up</div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
