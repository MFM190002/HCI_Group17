import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JourneyPage.css";
import { Link } from "react-router-dom";
import submit from "./icons8-enter-64.png";

export const JourneyPage = () => {
  const navigate = useNavigate();
  const [isCustomGoal, setIsCustomGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [customGoal, setCustomGoal] = useState(""); // State to store the custom goal

  const handleButtonClick = () => {
    navigate("/home");
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      // Process the custom goal or navigate
      if (isCustomGoal && customGoal) {
        console.log("Custom goal set:", customGoal); // Replace with goal processing logic
      }
      navigate("/home");
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
            <Link to="/home" onClick={handleButtonClick}>
              <img className="img" alt="Submit" src={submit} />
            </Link>
          </div>
        </div>
        <div className="text-wrapper-3">Set your college application goal</div>
      </div>
    </div>
  );
};
