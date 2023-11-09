  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import "./AddCheckpointPage.css";
  import { useNavigate } from "react-router-dom";
  import plus from "./icons8-plus-60.png"

  function AddCheckpointPage() {
    const [goal, setGoal] = useState("");

    const navigate = useNavigate()

    const handleButtonClick = () => {
      navigate("/home");
    };

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent the Enter key from submitting the form
      }
    };

    return (
      <div className="add-checkpoint">
        <div className="div">
          <div className="text-wrapper">IDCollege</div>
          <form>
            <div className="input-container">
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your goal"
                className="rectangle"
                
              />
              <Link to="/checkpoints" onClick={handleButtonClick}>
                <img className="img" alt="plus" src={plus} />
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  export default AddCheckpointPage;
