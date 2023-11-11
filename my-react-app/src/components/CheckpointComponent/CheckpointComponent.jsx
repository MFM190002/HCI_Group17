// CheckpointComponent.js
import React from 'react';
import './CheckpointComponent.css';

const CheckpointComponent = ({ checkpoint, onCheckClick }) => {
  return (
    <div className="home-checkpoint">
      <div
        className="home-checkpoint-icon"
        style={{ cursor: 'pointer' }}
      ></div>
      <div className="home-checkpoint-text">
        {checkpoint}
        <button className="check-button" onClick={() => onCheckClick(checkpoint)}>
          ✓
        </button>
      </div>
    </div>
  );
};

export default CheckpointComponent;
