// CheckpointsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import CheckpointComponent from '../../components/CheckpointComponent/CheckpointComponent';
import './CheckpointsPage.css';
import Cookies from 'js-cookie';

function CheckpointsPage() {
  const [completedCheckpoints, setCompletedCheckpoints] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('username');

  useEffect(() => {
    // Fetch friends list and user checkpoints from localStorage when the component mounts
    const data = Cookies.get(`user_${username}`) || '{}';
    const userCheckpoints = Cookies.get(`checkpoints_${username}`) || '[]';
    const fetchUserData = async () => {
      try {
        if (!username) {
          throw new Error('Username not provided in search params');
        }
        
        console.log(data);
        console.log(userCheckpoints);
        setCompletedCheckpoints(data.completedCheckpoints || []);
        setCheckpoints(JSON.parse(userCheckpoints) || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [username]);

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
  
      const progressPercentage = (updatedCompletedCheckpoints.length / checkpoints.length) * 100;
      console.log(updatedCompletedCheckpoints);
      
      const userData = Cookies.get(`userData_${username}`);

      // Parse the existing user data
      const parsedUserData = userData ? JSON.parse(userData) : {};

      // Update the specific fields (completedCheckpoints and progress)
      parsedUserData.completedCheckpoints = updatedCompletedCheckpoints;
      parsedUserData.progress = progressPercentage;

      console.log('parsed user data');
      console.log(parsedUserData);
      // Set the updated user data back to the cookie
      Cookies.set(`userData_${username}`, JSON.stringify(parsedUserData));
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
