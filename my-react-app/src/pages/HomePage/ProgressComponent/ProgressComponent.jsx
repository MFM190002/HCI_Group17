import React from 'react';
import './ProgressComponent.css';

const ProgressComponent = ({ progressPercentage }) => {
  return (
    <div className="home-progress-section">
      <div className="progress-label">Progress</div>
      <div className="progress-bar-container">
        <div
          className= "home-progress-bar"
          style={{ height: `100%`, width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="progress-percentage">{progressPercentage}% Complete</div>
    </div>
  );
};

export default ProgressComponent;
