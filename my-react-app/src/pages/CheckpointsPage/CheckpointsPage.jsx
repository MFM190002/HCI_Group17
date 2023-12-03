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
    const isConfirmed = window.confirm(`You are completing this checkpoint: ${clickedCheckpoint}. Confirm?`);
    
    if (!isConfirmed) {
      return;
    }

    try {
      const updatedCompletedCheckpoints = [...completedCheckpoints, clickedCheckpoint];
      setCompletedCheckpoints(updatedCompletedCheckpoints);

      const updatedCheckpoints = checkpoints.filter(cp => cp !== clickedCheckpoint);
      setCheckpoints(updatedCheckpoints);

      const progressPercentage = (updatedCompletedCheckpoints.length / college_checkpoints.length) * 100;

      localStorage.setItem('completedCheckpoints', JSON.stringify(updatedCompletedCheckpoints));
      localStorage.setItem('progress', progressPercentage);
      localStorage.setItem('checkpoints', JSON.stringify(updatedCheckpoints));
    } catch (error) {
      console.error('Error completing checkpoint:', error);
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
      <Header username={'SampleUser'} />
      <div className="content-container">
        <div className="page-checkpoints-list">
          <div className="checkpoints-title">
            Your Upcoming Checkpoints
          </div>
          <div className="page-checkpoint-container">{renderCheckpoints()}</div>
        </div>
        <Link to={`/add_checkpoint?username=SampleUser`} className="add-checkpoint-button">
          Add Checkpoints
        </Link>
      </div>
    </div>
  );
}

export default CheckpointsPage;
