// CheckpointsPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CheckpointsPage.css';
import Header from '../../components/Header/Header';
import CheckpointComponent from '../../components/CheckpointComponent/CheckpointComponent';

function CheckpointsPage({ checkpoints }) {
  const [progress, setProgress] = useState(0);
  const [completedCheckpoints, setCompletedCheckpoints] = useState([]);

  const handleCheckClick = (checkedCheckpoint) => {
    setCompletedCheckpoints((prevCompletedCheckpoints) => [
      ...prevCompletedCheckpoints,
      checkedCheckpoint,
    ]);
    setProgress((prevProgress) => prevProgress + 10);
  };

  // Filter out completed checkpoints from the list
  const remainingCheckpoints = checkpoints.filter(
    (checkpoint) => !completedCheckpoints.includes(checkpoint)
  );

  return (
    <div className="checkpoints-page">
      <Header />

      <div className="content-container">
        <div className="progress-section">
          <div className="progress-title">Progress</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(progress)}%` }}></div>
          </div>
        </div>
        <div className="page-checkpoints-list">
          <div className="page-checkpoint-container">
            {remainingCheckpoints.map((checkpoint, index) => (
              <div key={index} className="checkpoint-item">
                <CheckpointComponent
                  checkpoint={checkpoint}
                  onCheckClick={handleCheckClick}
                />
              </div>
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
