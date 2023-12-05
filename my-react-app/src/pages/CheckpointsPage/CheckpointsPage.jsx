// CheckpointsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import CheckpointComponent from '../../components/CheckpointComponent/CheckpointComponent';
import './CheckpointsPage.css';

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
      const storedCheckpoints = localStorage.getItem('checkpoints');
      if (!storedCheckpoints) {
        localStorage.setItem('checkpoints', JSON.stringify(college_checkpoints));
        setCheckpoints(college_checkpoints);
      } else {
        setCheckpoints(JSON.parse(storedCheckpoints));
      }

      const storedCompletedCheckpoints = localStorage.getItem('completedCheckpoints') || '[]';
      setCompletedCheckpoints(JSON.parse(storedCompletedCheckpoints));
    };

    initializeLocalStorage();
  }, []);

  const handleCheckpointClick = (clickedCheckpoint) => {
    const isCompleted = completedCheckpoints.includes(clickedCheckpoint);
    const confirmationMessage = isCompleted
      ? `You are marking this checkpoint as incomplete: ${clickedCheckpoint}. Confirm?`
      : `You are completing this checkpoint: ${clickedCheckpoint}. Confirm?`;
  
    const isConfirmed = window.confirm(confirmationMessage);
    
    if (!isConfirmed) {
      return;
    }
  
    try {
      let updatedCompletedCheckpoints;
      if (isCompleted) {
        // Undo completion
        updatedCompletedCheckpoints = completedCheckpoints.filter(cp => cp !== clickedCheckpoint);
      } else {
        // Complete checkpoint
        updatedCompletedCheckpoints = [...completedCheckpoints, clickedCheckpoint];
      }
  
      setCompletedCheckpoints(updatedCompletedCheckpoints);
  
      const progressPercentage = (updatedCompletedCheckpoints.length / college_checkpoints.length) * 100;
  
      localStorage.setItem('completedCheckpoints', JSON.stringify(updatedCompletedCheckpoints));
      localStorage.setItem('progress', progressPercentage);
    } catch (error) {
      console.error('Error updating completion status of checkpoint:', error);
    }
  };
  
   

  const handleCheckpointDelete = (deletedCheckpoint) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${deletedCheckpoint}"?`);
    
    if (isConfirmed) {
      try {
        const updatedCheckpoints = checkpoints.filter(cp => cp !== deletedCheckpoint);
        setCheckpoints(updatedCheckpoints);

        localStorage.setItem('checkpoints', JSON.stringify(updatedCheckpoints));
      } catch (error) {
        console.error('Error deleting checkpoint:', error);
      }
    }
  };

  const renderCheckpoints = () => {
    return checkpoints.map((checkpoint, index) => (
      <CheckpointComponent
        key={index}
        checkpoint={checkpoint}
        onCheckClick={handleCheckpointClick}
        onCheckDelete={handleCheckpointDelete}
        completed={completedCheckpoints.includes(checkpoint)}
      />
    ));
  };

  return (
    <div className="checkpoints-page-1">
      <Header username={username} />
      <div className="content-container">
        <div className="page-checkpoints-list">
          <div className="checkpoints-title">
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
