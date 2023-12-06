import React, { useState } from "react";
import "./SignupPage.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignup = async () => {
    // Check if any field is empty
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      setPasswordError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError(""); 

      try {
        // Update to use cookies for signup
        const userData = {
          username,
          password,
          progress: 0,
          friends: [],
          checkpoints: [],
          completedCheckpoints: [],
          applicationsCompleted: 0,
          targetUniversities: []
        };

        Cookies.set(`user_${username}`, JSON.stringify(userData));
        Cookies.set(`friends_${username}`, JSON.stringify([])); // Initialize friends as an empty array
        Cookies.set(`checkpoints_${username}`, JSON.stringify([])); // Initialize checkpoints as an empty array

        console.log("Signup successful");
        navigate(`/journey?username=${username}`);
      } catch (error) {
        console.error("Error during signup:", error);
      }
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
        <div className="signuppage-button" onClick={handleSignup}>
          <div className="signup-rectangle" />
          <div className="signup-button-text">Sign Up</div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
