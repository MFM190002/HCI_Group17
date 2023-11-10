// CheckpointsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CheckpointsPage.css';
import Header from '../../components/Header/Header';
function CheckpointsPage() {
  return (
    <div className="checkpoints-page">
      <Header />
      
      <div className="progress-section">
        <div className="progress-title">Progress</div>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
        <ul className="checkpoints-list">
          <li>Draft College Essay</li>
          <li>Fill out FAFSA</li>
          <li>Start UTD App</li>
        </ul>
      </div>

      <button className="add-checkpoint-button">Add Checkpoints</button>
    </div>
  );
}

export default CheckpointsPage;
