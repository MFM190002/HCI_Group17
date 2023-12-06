import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddCheckpointPage.css";
import { useNavigate } from "react-router-dom";
import plus from "./icons8-plus-60.png";
import Header from "../../components/Header/Header";
import Cookies from 'js-cookie';

function AddCheckpointPage({ addCheckpoint }) {
  const [goal, setGoal] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get("username");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    try {
      // Add the checkpoint to local storage
      const userCheckpoints = Cookies.get(`checkpoints_${username}`) || '[]';
      const checkpoints = JSON.parse(userCheckpoints);
      checkpoints.push(goal);
      Cookies.set(`checkpoints_${username}`, JSON.stringify(checkpoints));

      let data = Cookies.get(`user_${username}`) || '{}';
      data = JSON.parse(data);  // Parse the string into an object
      const completedCheckpoints = data.completedCheckpoints || [];

      const progressPercentage =
        (completedCheckpoints.length / checkpoints.length) * 100;

      data.progress = progressPercentage;  // Now `data` is an object, and you can set properties on it
      console.log(data.progress);
      console.log(progressPercentage);
      Cookies.set(`user_${username}`, JSON.stringify(data));
      // Update the state or perform any additional actions as needed
      addCheckpoint(goal);

      // Navigate to the checkpoints page
      navigate(`/checkpoints?username=${username}`);
    } catch (error) {
      console.error("Error adding checkpoint:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the Enter key from submitting the form
    }
  };

  return (
    <div className="add-checkpoint">
      <div className="div">
        <Header username={username} />
        <form>
          <div className="input-container">
            <div className='checkpoint-add-label'>
              Add a checkpoint
            </div>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your goal"
              className="input-rectangle"
            />
            <Link to={`/checkpoints?username=${username}`} onClick={handleButtonClick}>
              <img className="img" alt="plus" src={plus} />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCheckpointPage;
