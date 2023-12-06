import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import ProgressComponent from "./ProgressComponent/ProgressComponent";
import CheckpointComponent from "../../components/CheckpointComponent/CheckpointComponent";
import Header from "../../components/Header/Header";
import FriendComponent from "../FriendsPage/FriendComponent/FriendComponent";
import Cookies from "js-cookie";

function HomePage() {
  const [completedCheckpoints, setCompletedCheckpoints] = useState([]);
  const [friends, setFriends] = useState([]);
  const [allCheckpoints, setAllCheckpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('username');

  const data = Cookies.get(`user_${username}`) || '{}';
  const userCheckpoints = Cookies.get(`checkpoints_${username}`) || '[]';
  useEffect(() => {
    // Fetch friends list and user checkpoints from localStorage when the component mounts
    const storedFriends = Cookies.get(`friends_${username}`) || '[]';
    setFriends(JSON.parse(storedFriends));

    const fetchUserData = async () => {
      try {
        if (!username) {
          throw new Error('Username not provided in search params');
        }
        
        console.log(data);
        console.log(userCheckpoints);
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
    // Display confirmation pop-up
    const isConfirmed = window.confirm(`You are completing this checkpoint:
    ${clickedCheckpoint}.
    Confirm?`);
    
    if (!isConfirmed) {
      return; // Do nothing if the user cancels the confirmation
    }

    // Update local state
    const updatedCompletedCheckpoints = [...completedCheckpoints, clickedCheckpoint];
    setCompletedCheckpoints(updatedCompletedCheckpoints);

    // Calculate progress percentage
    const progressPercentage = (updatedCompletedCheckpoints.length / allCheckpoints.length) * 100;

    const userData = Cookies.get(`userData_${username}`);

    // Parse the existing user data
    const parsedUserData = userData ? JSON.parse(userData) : {};

    // Update the specific fields (completedCheckpoints and progress)
    parsedUserData.completedCheckpoints = updatedCompletedCheckpoints;
    parsedUserData.progress = progressPercentage;
    console.log(parsedUserData);
    // Set the updated user data back to the cookie
    Cookies.set(`userData_${username}`, JSON.stringify(parsedUserData));
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
      <CheckpointComponent key={index} checkpoint={checkpoint} onCheckClick={handleCheckpointClick} />
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