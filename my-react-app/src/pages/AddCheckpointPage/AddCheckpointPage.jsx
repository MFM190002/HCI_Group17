  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import "./AddCheckpointPage.css";
  import { useNavigate } from "react-router-dom";
  import plus from "./icons8-plus-60.png"
  import Header from "../../components/Header/Header";
  function AddCheckpointPage({ addCheckpoint }) {
    const [goal, setGoal] = useState("");

    const navigate = useNavigate()

    const handleButtonClick = () => {
      addCheckpoint(goal); // Add the new checkpoint
      navigate("/checkpoints");
    };

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent the Enter key from submitting the form
      }
    };

    return (
      <div className="add-checkpoint">
        <div className="div">
          <Header />
          <form>
            <div className="input-container">
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your goal"
                className="input-rectangle"
                
              />
              <Link to={{ pathname: "/checkpoints", state: { goal } }} onClick={handleButtonClick}>
                <img className="img" alt="plus" src={plus} />
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  export default AddCheckpointPage;
