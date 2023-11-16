// CheckpointComponent.js
import React from 'react';
import './CheckpointComponent.css';

const CheckpointComponent = ({ checkpoint, onCheckClick }) => {
  return (
    <div className="home-checkpoint">
      <div
        className="home-checkpoint-icon"
        onClick={() => onCheckClick(checkpoint)}
        style={{ cursor: 'pointer' }}
      ></div>
      <div className="home-checkpoint-text">
        {checkpoint}
      </div>
    </div>
  );
};

export default CheckpointComponent;
