import React from 'react';
import { Link } from 'react-router-dom';
import './CheckpointsPage.css';
import Header from '../../components/Header/Header';
import CheckpointComponent from '../../components/CheckpointComponent/CheckpointComponent';

function CheckpointsPage({ checkpoints }) {
  return (
    <div className="checkpoints-page">
      <Header />

      <div className="content-container">
        <div className="progress-section">
          <div className="progress-title">Progress</div>
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
        </div>
        <div className="page-checkpoints-list">
            <div className="page-checkpoint-container">
              {checkpoints.map((checkpoint, index) => (
                <CheckpointComponent key={index} checkpoint={checkpoint} />
              ))}
            </div>
        </div>

        <Link to="/addcheckpoint" className="add-checkpoint-button">
          Add Checkpoints
        </Link>
      </div>
    </div>
  );
}

export default CheckpointsPage;
