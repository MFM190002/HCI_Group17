// HomePage.jsx
import React, { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import ProgressComponent from "./ProgressComponent/ProgressComponent";
import CheckpointComponent from "../../components/CheckpointComponent/CheckpointComponent";
import Header from "../../components/Header/Header";
import FriendComponent from "../FriendsPage/FriendComponent/FriendComponent";

function HomePage({ checkpoints, friends }) {
  const [progress, setProgress] = useState(0);
  const [completedCheckpoints, setCompletedCheckpoints] = useState([]);
  const findUsername = new URLSearchParams(window.location.search);
  const username = findUsername.get('username');

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

  return (
    <div className="friends-container">
      <div className="content">
        <Header />
        <ProgressComponent progressPercentage={progress} />

        <div className="home-content-container">
          <div className="home-friends-list">
            <div className="friends-leaderboard">Friends Leaderboard</div>
              {friends.slice(0,3).map((friend) => (
                <FriendComponent key={friend.id} friend={friend} />
              ))}
            <Link to={`/friends?username=${username}`} className="view-friends-link">
              View Friends
            </Link>
          </div>

          <div className="checkpoints-list">
            <div className="upcoming-checkpoints">Your Upcoming Checkpoints</div>
            <div className="checkpoint-container">
              {remainingCheckpoints.map((checkpoint, index) => (
                <CheckpointComponent key={index} checkpoint={checkpoint} onCheckClick={handleCheckpointClick}/>
              ))}
            </div>
            <Link to="/checkpoints" className="view-checkpoints-link">
              View Checkpoints
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
