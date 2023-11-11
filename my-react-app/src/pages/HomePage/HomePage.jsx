import React, { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import ProgressComponent from "./ProgressComponent/ProgressComponent";
import CheckpointComponent from "../../components/CheckpointComponent/CheckpointComponent";
import Header from "../../components/Header/Header";
import FriendComponent from "../FriendsPage/FriendComponent/FriendComponent";

function HomePage({ checkpoints, friends }) {
  // Placeholder for dynamic progress percentage (you'll need to replace this with actual state logic)
  const [progress, setProgress] = useState(50);

  const handleUpdateProgress = () => {
    setProgress((prevProgress) => prevProgress + 10);
  };

  return (
    <div className="friends-container">
      <div className="content">
        <Header />
        <ProgressComponent progressPercentage={progress} />

        <div className="update-progress">
          <button onClick={handleUpdateProgress}>Update Progress</button>
        </div>
        <div className="home-content-container">
          <div className="home-friends-list">
            <div className="friends-leaderboard">Friends Leaderboard</div>
              {friends.slice(0,3).map((friend) => (
                <FriendComponent key={friend.id} friend={friend} />
              ))}
            <Link to="/friends" className="view-friends-link">
              View Friends
            </Link>
          </div>

          <div className="checkpoints-list">
            <div className="upcoming-checkpoints">Your Upcoming Checkpoints</div>
            <div className="checkpoint-container">
              {checkpoints.slice(0,3).map((checkpoint, index) => (
                <CheckpointComponent key={index} checkpoint={checkpoint} />
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
