import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JourneyPage.css";
import { Link } from "react-router-dom";
import submit from "./icons8-enter-64.png";

export const JourneyPage = () => {
  const navigate = useNavigate();
  const [isCustomGoal, setIsCustomGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(""); // Initialize selectedGoal state

  const handleButtonClick = () => {
    navigate("/home");
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate("/home");
    }
  };

  const handleGoalSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedGoal(selectedValue);

    if (selectedValue === "Custom Goal") {
      setIsCustomGoal(true);
    } else {
      setIsCustomGoal(false);
    }
  };

  return (
    <div className="journey">
      <div className="div">
        <div className="text-wrapper">IDCollege</div>
        <div className="overlap">
          <div className="group">
            {isCustomGoal ? ( // Show custom input when isCustomGoal is true
              <input
                type="text"
                className="text-wrapper-5 input-box"
                placeholder="Type your goal"
                onKeyPress={handleInputKeyPress}
              />
            ) : (
              // Show drop-down list when isCustomGoal is false
              <select
                name="goals"
                className="text-wrapper-5 input-box"
                value={selectedGoal}
                onChange={handleGoalSelect}
              >
                <option value="Curated College Application Guide">
                  Follow our Curated College Application Guide
                </option>
                <option value="Curated Scholarship Application Guide">
                  Follow our Curated Scholarship Application Guide
                </option>
                <option value="Custom Goal">I want to set my own goal</option>
              </select>
            )}
            <Link to="/home">
              <img className="img" alt="Rectangle" src={submit} />
            </Link>
          </div>
        </div>
        <div className="text-wrapper-3">Set your college application goal</div>
      </div>
    </div>
  );
};
