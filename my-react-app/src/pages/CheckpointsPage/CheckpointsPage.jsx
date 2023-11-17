import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CheckpointsPage.css';
import Header from '../../components/Header/Header';
import CheckpointComponent from '../../components/CheckpointComponent/CheckpointComponent';
import ProgressComponent from '../HomePage/ProgressComponent/ProgressComponent';

const college_checkpoints = [
  "Create a resume",
  "Fill out FAFSA",
  "Prepare for standardized tests",
  "Research colleges",
  "Request letters of recommendation",
  "Write college essays",
  "Submit college applications",
  "Apply for scholarships",
  "Plan college visits",
  "Finalize college decision"
];

function CheckpointsPage() {
  const [completedCheckpoints, setCompletedCheckpoints] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);

  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('username');

  useEffect(() => {
    const initializeLocalStorage = () => {
      // Check if checkpoints are already in localStorage
      const storedCheckpoints = localStorage.getItem('checkpoints');
      if (!storedCheckpoints) {
        // If not, initialize localStorage with college_checkpoints
        localStorage.setItem('checkpoints', JSON.stringify(college_checkpoints));
        setCheckpoints(college_checkpoints);
      } else {
        setCheckpoints(JSON.parse(storedCheckpoints));
      }

      // Fetch completed checkpoints from local storage
      const storedCompletedCheckpoints = localStorage.getItem('completedCheckpoints') || '[]';
      setCompletedCheckpoints(JSON.parse(storedCompletedCheckpoints));
    };

    initializeLocalStorage();
  }, [username]);

  const handleCheckpointClick = (clickedCheckpoint) => {
    // Display confirmation pop-up
    const isConfirmed = window.confirm(`You are completing this checkpoint: 
    ${clickedCheckpoint}. 
    Confirm?`);
    
    if (!isConfirmed) {
      return; // Do nothing if the user cancels the confirmation
    }

    try {
      // Update local state
      const updatedCompletedCheckpoints = [...completedCheckpoints, clickedCheckpoint];
      setCompletedCheckpoints(updatedCompletedCheckpoints);

      // Calculate progress percentage
      const progressPercentage = (updatedCompletedCheckpoints.length / checkpoints.length) * 100;

      // Set progress and completed checkpoints to localStorage
      localStorage.setItem('completedCheckpoints', JSON.stringify(updatedCompletedCheckpoints));
      localStorage.setItem('progress', progressPercentage);
    } catch (error) {
      console.error('Error completing checkpoint:', error);
    }
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
      <div className="checkpoints-progress">
          <ProgressComponent />
      </div>
      <div className="content-container">
        <div className="page-checkpoints-list">
          <div className="checkpoints-title" >
            Your Upcoming Checkpoints
          </div>
          <div className="page-checkpoint-container">{renderCheckpoints()}</div>
        </div>
        <Link to={`/add_checkpoint?username=${username}`} className="add-checkpoint-button">
          Add Checkpoints
        </Link>
      </div>
    </div>
  );
}

export default CheckpointsPage;
