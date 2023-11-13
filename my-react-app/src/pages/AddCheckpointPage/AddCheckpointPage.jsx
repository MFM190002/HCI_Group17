import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddCheckpointPage.css";
import { useNavigate } from "react-router-dom";
import plus from "./icons8-plus-60.png";
import Header from "../../components/Header/Header";

function AddCheckpointPage({ addCheckpoint }) {
  const [goal, setGoal] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get("username");
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/add_checkpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username,
          new_checkpoint: goal,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add checkpoint");
      }

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
            <Link
              to={`/checkpoints?username=${username}`}
              onClick={handleButtonClick}
            >
              <img className="img" alt="plus" src={plus} />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCheckpointPage;
