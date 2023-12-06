import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import ProgressComponent from "./ProgressComponent/ProgressComponent";
import CheckpointComponent from "../../components/CheckpointComponent/CheckpointComponent";
import Header from "../../components/Header/Header";
import FriendComponent from "../FriendsPage/FriendComponent/FriendComponent";
import Cookies from "js-cookie";

function HomePage() {
  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('username');

  const data = Cookies.get(`user_${username}`) || '{}';
  const userCheckpoints = Cookies.get(`checkpoints_${username}`) || '[]';

  // Initialize state using data from cookies
  const [completedCheckpoints, setCompletedCheckpoints] = useState(
    JSON.parse(data).completedCheckpoints || []
  );
  const [friends, setFriends] = useState([]);
  const [allCheckpoints, setAllCheckpoints] = useState(JSON.parse(userCheckpoints) || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch friends list and user checkpoints from localStorage when the component mounts
    const storedFriends = Cookies.get(`friends_${username}`) || '[]';
    setFriends(JSON.parse(storedFriends));

    const fetchUserData = async () => {
      try {
        if (!username) {
          throw new Error('Username not provided in search params');
        }

        console.log('completedCheckpoints:', data.completedCheckpoints);
        console.log('checkpoints:', userCheckpoints);
        setCompletedCheckpoints(data.completedCheckpoints || []);
        setAllCheckpoints(JSON.parse(userCheckpoints) || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, data, userCheckpoints]);

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
        updatedCompletedCheckpoints = completedCheckpoints.filter((cp) => cp !== clickedCheckpoint);
      } else {
        // Complete checkpoint
        updatedCompletedCheckpoints = [...completedCheckpoints, clickedCheckpoint];
      }

      setCompletedCheckpoints(updatedCompletedCheckpoints);
      const updatedCheckpoints = allCheckpoints.map((cp) =>
        cp === clickedCheckpoint ? clickedCheckpoint : cp
      );
      setAllCheckpoints(updatedCheckpoints);

      const progressPercentage = (updatedCompletedCheckpoints.length / allCheckpoints.length) * 100;

      const userData = Cookies.get(`user_${username}`);
      const parsedUserData = userData ? JSON.parse(userData) : {};

      parsedUserData.checkpoints = allCheckpoints;
      parsedUserData.completedCheckpoints = updatedCompletedCheckpoints;
      parsedUserData.progress = progressPercentage;

      Cookies.set(`user_${username}`, JSON.stringify(parsedUserData));
    } catch (error) {
      console.error('Error updating completion status of checkpoint:', error);
    }
  };

  const handleCheckpointEdit = (editedCheckpoint, newCheckpoint) => {
    try {
      const updatedCheckpoints = allCheckpoints.map(cp => (cp === editedCheckpoint ? newCheckpoint : cp));
      setAllCheckpoints(updatedCheckpoints);

      const userData = Cookies.get(`user_${username}`);
      const parsedUserData = userData ? JSON.parse(userData) : {};
      parsedUserData.checkpoints = updatedCheckpoints;
      Cookies.set(`user_${username}`, JSON.stringify(parsedUserData));
    } catch (error) {
      console.error('Error updating checkpoint:', error);
    }
  };

  const handleCheckpointDelete = (deletedCheckpoint) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${deletedCheckpoint}"?`);
    if (isConfirmed) {
      try {
        const updatedCheckpoints = allCheckpoints.filter(cp => cp !== deletedCheckpoint);
        setAllCheckpoints(updatedCheckpoints);

        const userData = Cookies.get(`user_${username}`);
        const parsedUserData = userData ? JSON.parse(userData) : {};
        parsedUserData.checkpoints = updatedCheckpoints;
        Cookies.set(`user_${username}`, JSON.stringify(parsedUserData));
      } catch (error) {
        console.error('Error deleting checkpoint:', error);
      }
    }
  };

  const renderFriendsList = () => {
    return friends.slice(0, 3).map((friend, index) => (
      <FriendComponent key={index} friend={friend} username={username} />
    ));
  };

  // Filter out completed checkpoints from the list
  const remainingCheckpoints = allCheckpoints.filter(
    (checkpoint) => !completedCheckpoints.includes(checkpoint)
  );

  const renderCheckpoints = () => {
    // Display only the first three checkpoints
    const displayedCheckpoints = remainingCheckpoints.slice(0, 3);
    return displayedCheckpoints.map((checkpoint, index) => (
      <CheckpointComponent
        key={index}
        checkpoint={checkpoint}
        onCheckClick={handleCheckpointClick}
        onCheckEdit={handleCheckpointEdit}
        onCheckDelete={handleCheckpointDelete}
        completed={completedCheckpoints.includes(checkpoint)}
        disableActions={true}  // Set to true to disable actions
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
    <div className="friends-container">
      <div className="content">
        <Header username={username} />
        <div className="home-progress-container">
          <ProgressComponent />
        </div>

        <div className="home-content-container">
          <div className="home-friends-list">
            <div className="friends-leaderboard">Friends Leaderboard</div>
            <div className="friends-list">{renderFriendsList()}</div>
            <Link to={`/friends?username=${username}`} className="view-friends-link">
              View Friends
            </Link>
          </div>

          <div className="checkpoints-list">
            <div className="upcoming-checkpoints">Your Upcoming Checkpoints</div>
            <div className="checkpoint-container">
              {renderCheckpoints()}
            </div>
            <Link to={`/checkpoints?username=${username}`} className="view-checkpoints-link">
              View Checkpoints
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
