// CheckpointsPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import CheckpointComponent from '../../components/CheckpointComponent/CheckpointComponent';
import './CheckpointsPage.css';
import Cookies from 'js-cookie';

function CheckpointsPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('username');
  const data = Cookies.get(`user_${username}`) || '{}';
  const userCheckpoints = Cookies.get(`checkpoints_${username}`) || '[]';

  // Initialize state using data from cookies
  const [completedCheckpoints, setCompletedCheckpoints] = useState(
    JSON.parse(data).completedCheckpoints || []
  );
  const [checkpoints, setCheckpoints] = useState(JSON.parse(userCheckpoints) || []);


  const handleCheckpointClick = (clickedCheckpoint) => {
    try {
      const isCompleted = completedCheckpoints.includes(clickedCheckpoint);
      const confirmationMessage = isCompleted
        ? `You are marking this checkpoint as incomplete: ${clickedCheckpoint}. Confirm?`
        : `You are completing this checkpoint: ${clickedCheckpoint}. Confirm?`;

      const isConfirmed = window.confirm(confirmationMessage);

      if (!isConfirmed) {
        return;
      }

      let updatedCompletedCheckpoints;
      if (isCompleted) {
        // Undo completion
        updatedCompletedCheckpoints = completedCheckpoints.filter((cp) => cp !== clickedCheckpoint);
      } else {
        // Complete checkpoint
        updatedCompletedCheckpoints = [...completedCheckpoints, clickedCheckpoint];
      }

      setCompletedCheckpoints(updatedCompletedCheckpoints);

      const updatedCheckpoints = checkpoints.map((cp) =>
        cp === clickedCheckpoint ? clickedCheckpoint : cp
      );
      setCheckpoints(updatedCheckpoints);

      const progressPercentage =
        (updatedCompletedCheckpoints.length / updatedCheckpoints.length) * 100;

      const userData = Cookies.get(`user_${username}`);
      const parsedUserData = userData ? JSON.parse(userData) : {};

      parsedUserData.checkpoints = updatedCheckpoints;
      parsedUserData.completedCheckpoints = updatedCompletedCheckpoints;
      parsedUserData.progress = progressPercentage;

      Cookies.set(`user_${username}`, JSON.stringify(parsedUserData));
    } catch (error) {
      console.error('Error updating completion status of checkpoint:', error);
    }
  };
  

  const handleCheckpointEdit = (editedCheckpoint, originalCheckpoint) => {
    try {
      const updatedCheckpoints = checkpoints.map((cp) =>
        cp === originalCheckpoint ? editedCheckpoint : cp
      );

      setCheckpoints(updatedCheckpoints);

      const userData = Cookies.get(`user_${username}`);
      const parsedUserData = userData ? JSON.parse(userData) : {};

      parsedUserData.checkpoints = updatedCheckpoints;
      parsedUserData.completedCheckpoints = completedCheckpoints;
      // Note: Do not update progress for editing

      console.log('Updated User Data:', parsedUserData);
      Cookies.set(`user_${username}`, JSON.stringify(parsedUserData));
    } catch (error) {
      console.error('Error updating edited checkpoint:', error);
    }
  };

  const handleCheckpointDelete = (deletedCheckpoint) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${deletedCheckpoint}"?`);
    if (isConfirmed) {
      try {
        const updatedCheckpoints = checkpoints.filter(cp => cp !== deletedCheckpoint);
        setCheckpoints(updatedCheckpoints);

        const userData = Cookies.get(`user_${username}`);
        const parsedUserData = userData ? JSON.parse(userData) : {};
        parsedUserData.checkpoints = updatedCheckpoints;
        Cookies.set(`user_${username}`, JSON.stringify(parsedUserData));
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
        onCheckEdit={handleCheckpointEdit}
        onCheckDelete={handleCheckpointDelete}
        completed={completedCheckpoints.includes(checkpoint)}
      />
    ));
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

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
