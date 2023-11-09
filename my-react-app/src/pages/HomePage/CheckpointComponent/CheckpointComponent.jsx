// CheckpointComponent.js
import React from 'react';
import './CheckpointComponent.css';

const CheckpointComponent = ({ checkpoint }) => {
  return (
    <div className="home-checkpoint">
      <div className="home-checkpoint-icon"></div>
      <div className="home-checkpoint-text">{checkpoint}</div>
    </div>
  );
};

export default CheckpointComponent;
