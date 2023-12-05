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

  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('username');
  const userData = JSON.parse(Cookies.get(`user_${username}`));

  useEffect(() => {
    // Fetch friends list and user checkpoints from localStorage when the component mounts
    const storedFriends = Cookies.get(`friends_${username}`) || '[]';
    setFriends(JSON.parse(storedFriends));

    const userData = JSON.parse(Cookies.get(`user_${username}`));
    const storedCompletedCheckpoints = userData.completedCheckpoints || [];
    if (storedCompletedCheckpoints && storedCompletedCheckpoints.length > 0) {
      setCompletedCheckpoints(storedCompletedCheckpoints);
    }

    // Initialize the list of all checkpoints with the sample college checkpoints
    const sampleCollegeCheckpoints = [
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

    setAllCheckpoints(sampleCollegeCheckpoints);

    // Check if there are additional checkpoints in localStorage
    const storedUserCheckpoints = Cookies.get(`checkpoints_${username}`);
    if (storedUserCheckpoints) {
      const userCheckpointsFromStorage = JSON.parse(storedUserCheckpoints);
      setAllCheckpoints((prevCheckpoints) => [...prevCheckpoints, ...userCheckpointsFromStorage]);
    }
  }, [username]);

  Cookies.set(`checkpoints_${username}`, JSON.stringify(allCheckpoints));
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

    // Set progress and completed checkpoints to localStorage
    console.log(allCheckpoints)
    Cookies.set(userData.completedCheckpoints, JSON.stringify(updatedCompletedCheckpoints));
    Cookies.set(userData.progress, progressPercentage.toString());
  };

  const renderFriendsList = () => {
    return friends.slice(0, 3).map((friend, index) => (
      <FriendComponent key={index} friend={friend} />
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
