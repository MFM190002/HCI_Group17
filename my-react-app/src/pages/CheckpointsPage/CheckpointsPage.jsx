import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CheckpointsPage.css';
import Header from '../../components/Header/Header';
import CheckpointComponent from '../../components/CheckpointComponent/CheckpointComponent';
import ProgressComponent from '../HomePage/ProgressComponent/ProgressComponent';

function CheckpointsPage() {
  const [progress, setProgress] = useState(0);
  const [completedCheckpoints, setCompletedCheckpoints] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);

  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('username');
  
  useEffect(() => {
    // Fetch checkpoints from the backend when the component mounts
    fetchCheckpoints(username);
  }, [username]);
  

  const fetchCheckpoints = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get_checkpoints?username=${username}`, {
        method: "GET",
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Failed to fetch checkpoints");
      }

      const data = await response.json();
      setCheckpoints(data.checkpoints);
    } catch (error) {
      console.error("Error fetching checkpoints:", error);
    }
  };

  const handleCheckpointClick = (clickedCheckpoint) => {
    setCompletedCheckpoints((prevCompletedCheckpoints) => [
      ...prevCompletedCheckpoints,
      clickedCheckpoint,
    ]);
    setProgress((prevProgress) => (prevProgress + 10 <= 100 ? prevProgress + 10 : prevProgress));
  };

  // Filter out completed checkpoints from the list
  const remainingCheckpoints = checkpoints.filter(
    (checkpoint) => !completedCheckpoints.includes(checkpoint)
  );

  const renderCheckpoints = () => {
    // Display only the first three checkpoints
    const displayedCheckpoints = remainingCheckpoints;
    return displayedCheckpoints.map((checkpoint, index) => (
      <CheckpointComponent key={index} checkpoint={checkpoint} onCheckClick={handleCheckpointClick} />
    ));
  };


  return (
    <div className="checkpoints-page-1">
      <Header username={username} />
      <div className="content-container">
        <div className = "checkpoints-progress">
          <ProgressComponent progressPercentage={progress} />
        </div>
        
        <div className="page-checkpoints-list">
          <div className="page-checkpoint-container">
            {renderCheckpoints()}
          </div>
        </div>

        <Link to={`/add_checkpoint?username=${username}`} className="add-checkpoint-button">
          Add Checkpoints
        </Link>
      </div>
    </div>
  );
}

export default CheckpointsPage;
