import React from 'react';
import './ProgressComponent.css';

const ProgressComponent = () => {
  const rawProgressPercentage = localStorage.getItem('progress') || 0;
  const roundedProgressPercentage = Math.round(parseFloat(rawProgressPercentage));

  return (
    <div className="home-progress-section">
      <div className="progress-label">Progress</div>
      <div className="progress-bar-container">
        <div
          className="home-progress-bar"
          style={{ height: `100%`, width: `${roundedProgressPercentage}%` }}
        ></div>
      </div>
      <div className="progress-percentage">{roundedProgressPercentage}% Complete</div>
    </div>
  );
};

export default ProgressComponent;
