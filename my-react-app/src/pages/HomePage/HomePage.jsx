import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

function HomePage() {
  // Placeholder for dynamic progress percentage (you'll need to replace this with actual state logic)
  const progressPercentage = 50;

  return (
    <div className="friends-container">
      <div className="content">
        <div className="header">IDCollege</div>

        <div className="logout-button">
          <img
            className="rectangle"
            alt="Rectangle"
            src="https://cdn.animaapp.com/projects/65408ceb2ddc83e6bd71570e/releases/65408e081cff822e1265c0f3/img/rectangle-19-2.svg"
          />
          <Link to="/" className="logout-link">
            Sign Out
          </Link>
        </div>
        <div className="checkpoints-container" >
          <div className="upcoming-checkpoints">Your Upcoming Checkpoints</div>
          <div className="checkpoints-list">
            <div className="checkpoint">
              <div className="checkpoint-icon"></div>
              <div className="checkpoint-text">Research 5 Colleges</div>
            </div>
            <div className="checkpoint">
              <div className="checkpoint-icon"></div>
              <div className="checkpoint-text">Fill out FAFSA</div>
            </div>
            <div className="checkpoint">
              <div className="checkpoint-icon"></div>
              <div className="checkpoint-text">Create your resume</div>
            </div>
          </div>
          <Link to="/checkpoints" className="view-checkpoints-link"> View Checkpoints </Link>
        </div>

        <div className="friends-leaderboard">Friends Leaderboard</div>
        <Link to="/friends">View Friends</Link>
        <div className="progress-section">
          <div className="progress-label">Progress</div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-percentage">{progressPercentage}% Complete</div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
