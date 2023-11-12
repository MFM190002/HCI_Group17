import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import ProgressComponent from "./ProgressComponent/ProgressComponent";
import CheckpointComponent from "../../components/CheckpointComponent/CheckpointComponent";
import Header from "../../components/Header/Header";
import FriendComponent from "../FriendsPage/FriendComponent/FriendComponent";

function HomePage({ checkpoints }) {
  const [progress, setProgress] = useState(0);
  const [completedCheckpoints, setCompletedCheckpoints] = useState([]);
  const [friends, setFriends] = useState([]);
  const [userCheckpoints, setUserCheckpoints] = useState([]);

  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('username');

  useEffect(() => {
    // Fetch friends list and user checkpoints from the backend when the component mounts
    fetchFriendsList(username);
    fetchUserCheckpoints(username);

    const storedCompletedCheckpoints = localStorage.getItem('completedCheckpoints');
    if (storedCompletedCheckpoints) {
      setCompletedCheckpoints(JSON.parse(storedCompletedCheckpoints));
    }
  }, [username]);

  const fetchFriendsList = async (username) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get_friends_list?username=${username}`, {
        method: "GET",
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Failed to fetch friends list");
      }

      const data = await response.json();
      setFriends(data.friends);
    } catch (error) {
      console.error("Error fetching friends list:", error);
    }
  };

  const fetchUserCheckpoints = async (username) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get_checkpoints?username=${username}`, {
        method: "GET",
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user checkpoints");
      }

      const data = await response.json();
      setUserCheckpoints(data.checkpoints);
    } catch (error) {
      console.error("Error fetching user checkpoints:", error);
    }
  };

  const renderFriendsList = () => {
    return friends.slice(0,3).map((friend) => (
      <FriendComponent key={friend.id} friend={friend.name} />
    ));
  };

  const handleCheckpointClick = (clickedCheckpoint) => {
    const updatedCompletedCheckpoints = [
      ...completedCheckpoints,
      clickedCheckpoint,
    ];
    setCompletedCheckpoints(updatedCompletedCheckpoints);
    setProgress((prevProgress) => (prevProgress + 10 <= 100 ? prevProgress + 10 : prevProgress));

    localStorage.setItem('completedCheckpoints', JSON.stringify(updatedCompletedCheckpoints));
  };

  // Filter out completed checkpoints from the list
  const remainingCheckpoints = userCheckpoints.filter(
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
          <ProgressComponent progressPercentage={progress} />
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
