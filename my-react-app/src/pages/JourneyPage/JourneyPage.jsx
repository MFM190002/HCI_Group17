import React from "react";
import { Link } from "react-router-dom";
import "./JourneyPage.css";

export const JourneyPage = () => {
  return (
    <div className="journey">
      <div className="div">
        <div className="text-wrapper">IDCollege</div>
        <div className="overlap">
          <div className="group">
            <div className="overlap-group">
            <input type="text" className="text-wrapper-5" placeholder="Apply to UTD" />
            </div>
          </div>
          <Link to="/home">
            <img
              className="img"
              alt="Rectangle"
              src="https://cdn.animaapp.com/projects/65408ceb2ddc83e6bd71570e/releases/65408e081cff822e1265c0f3/img/rectangle-18.svg"
            />
          </Link>
        </div>
        <div className="text-wrapper-3">Journey Start Goal</div>
      </div>
    </div>
  );
};
