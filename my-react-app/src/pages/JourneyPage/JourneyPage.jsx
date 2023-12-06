import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JourneyPage.css";
import { Link } from "react-router-dom";
import submit from "./icons8-enter-64.png";
import Cookies from "js-cookie";

export const JourneyPage = () => {
  const navigate = useNavigate();
  const [isCustomGoal, setIsCustomGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [customGoal, setCustomGoal] = useState("");
  const [error, setError] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('username');
  const allCheckpoints = [
    "Create a resume",
    "Fill out FAFSA",
    "Prepare for standardized tests",
    "Research colleges",
    "Request letters of recommendation",
    "Write college essays",
    "Submit college applications",
    "Apply for scholarships",
    "Plan college visits",
    "Finalize college decision"
  ];

  const handleButtonClick = (event) => {
    event.preventDefault();
    if (!selectedGoal) {
      setError("Please select a journey before proceeding");
      return;
    }

    // Process the custom goal or set checkpoints and navigate
    if (isCustomGoal && customGoal) {
      console.log("Custom goal set:", customGoal); // Replace with goal processing logic
    } else {
      setCheckpointsInCookies(username);
    }

    // Reset error if a journey is selected
    setError("");
    navigate(`/home?username=${username}`);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      // Process the custom goal or set checkpoints and navigate
      if (isCustomGoal && customGoal) {
        console.log("Custom goal set:", customGoal); // Replace with goal processing logic
      } else {
        setCheckpointsInCookies(username);
      }

      navigate(`/home?username=${username}`);
    }
  };

  const handleGoalSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedGoal(selectedValue);

    setIsCustomGoal(selectedValue === "Custom Goal");
  };

  const handleCustomGoalChange = (event) => {
    setCustomGoal(event.target.value);
  };

  const setCheckpointsInCookies = (username) => {
    Cookies.set(`checkpoints_${username}`, JSON.stringify(allCheckpoints));
    console.log(JSON.parse(Cookies.get(`checkpoints_${username}`)));
    console.log(Cookies.get(`user_${username}`));
  };

  return (
    <div className="journey">
      <div className="div">
        <div className="text-wrapper">IDCollege</div>
        <div className="overlap">
          <div className="group">
            <select
              name="goals"
              className="text-wrapper-5 input-box"
              value={selectedGoal}
              onChange={handleGoalSelect}
            >
              <option value="">Select your goal</option>
              <option value="Curated College Application Guide">
                Follow our Curated College Application Guide
              </option>
              <option value="Curated Scholarship Application Guide">
                Follow our Curated Scholarship Application Guide
              </option>
              <option value="Custom Goal">I want to set my own goal</option>
            </select>
            {isCustomGoal && (
              <input
                type="text"
                className="text-wrapper-5 input-box"
                placeholder="Type your goal"
                value={customGoal}
                onChange={handleCustomGoalChange}
                onKeyPress={handleInputKeyPress}
              />
            )}
            <Link to={`/home?username=${username}`} onClick={handleButtonClick}>
              <img className="img" alt="Submit" src={submit} />
            </Link>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="text-wrapper-3">Set your college application goal</div>
      </div>
    </div>
  );
};
