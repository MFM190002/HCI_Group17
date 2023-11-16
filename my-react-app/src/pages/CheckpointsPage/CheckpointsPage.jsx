import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CheckpointsPage.css';
import Header from '../../components/Header/Header';
import CheckpointComponent from '../../components/CheckpointComponent/CheckpointComponent';
import ProgressComponent from '../HomePage/ProgressComponent/ProgressComponent';

function CheckpointsPage() {
  const [completedCheckpoints, setCompletedCheckpoints] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);

  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('username');

  useEffect(() => {
    const fetchCheckpoints = async () => {
      try {
        const response = await fetch(`https://fastapi-hci-project-e870697179dd.herokuapp.com/get_checkpoints?username=${username}`, {
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
    fetchCheckpoints();

    const storedCompletedCheckpoints = localStorage.getItem('completedCheckpoints');
    if (storedCompletedCheckpoints) {
      setCompletedCheckpoints(JSON.parse(storedCompletedCheckpoints));
    }
  }, [username]);

  const fetchCheckpoints = async () => {
    try {
      const response = await fetch(`https://fastapi-hci-project-e870697179dd.herokuapp.com/get_checkpoints?username=${username}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch checkpoints');
      }

      const data = await response.json();
      setCheckpoints(data.checkpoints);
    } catch (error) {
      console.error('Error fetching checkpoints:', error);
    }
  };

  const handleCheckpointClick = async (clickedCheckpoint) => {
    try {
      // Update local state
      const updatedCompletedCheckpoints = [...completedCheckpoints, clickedCheckpoint];
      setCompletedCheckpoints(updatedCompletedCheckpoints);

      // Calculate progress percentage
      const progressPercentage = (updatedCompletedCheckpoints.length / checkpoints.length) * 100;

      // Set progress and completed checkpoints to localStorage
      localStorage.setItem('completedCheckpoints', JSON.stringify(updatedCompletedCheckpoints));
      localStorage.setItem('progress', progressPercentage);

      // Update the backend with the completed checkpoint
      const response = await fetch(`https://fastapi-hci-project-e870697179dd.herokuapp.com/complete_checkpoint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          checkpoint: clickedCheckpoint,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete checkpoint on the server');
      }

      // Fetch updated checkpoints after completion
      fetchCheckpoints(username);
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
