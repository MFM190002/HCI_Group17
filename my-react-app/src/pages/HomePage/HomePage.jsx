// Updated HomePage component with buttons

import React, { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import ProgressComponent from "./ProgressComponent/ProgressComponent";
import CheckpointComponent from "../../components/CheckpointComponent/CheckpointComponent";
import Header from "../../components/Header/Header";
function HomePage({ checkpoints }) {
  // Placeholder for dynamic progress percentage (you'll need to replace this with actual state logic)
  const [progress, setProgress] = useState(50);
    // You can update the progress state as needed, perhaps based on user interactions or data fetching
  const handleUpdateProgress = () => {
    // Example: Increment progress by 10%
    setProgress((prevProgress) => prevProgress + 10);
  };
  return (
    <div className="friends-container">
      <div className="content">
        <Header />
        <div className="checkpoints-list">
          <div className="upcoming-checkpoints">Your Upcoming Checkpoints</div>
          <div className="checkpoint-container">
            {checkpoints.map((checkpoint, index) => (
              <CheckpointComponent key={index} checkpoint={checkpoint} />
            ))}
          </div>
          <Link to="/checkpoints" className="view-checkpoints-link">View Checkpoints</Link>
        </div>
        <div className="home-friends-list">
          <div className="friends-leaderboard">Friends Leaderboard</div>
          <Link to="/friends" className="view-friends-link">View Friends</Link> {/* "View Friends" button */}
        </div>
        
        
        <ProgressComponent progressPercentage={progress} />
        <div className="update-progress">
          <button onClick={handleUpdateProgress}>Update Progress</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
