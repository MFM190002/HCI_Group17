import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import { JourneyPage } from './pages/JourneyPage/JourneyPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import AddFriendPage from './pages/AddFriendPage/AddFriendPage';
import AddCheckpointPage from './pages/AddCheckpointPage/AddCheckpointPage';
import CheckpointsPage from './pages/CheckpointsPage/CheckpointsPage';
import ViewUserProfile from './pages/ViewUserPage/ViewUserPage';
function App() {
  const [checkpoints, setCheckpoints] = React.useState(['Draft College Essay', 'Fill out FAFSA', 'Start UTD App']);

  // Function to add a new checkpoint to the list
  const addCheckpoint = (newCheckpoint) => {
    setCheckpoints((prevCheckpoints) => [...prevCheckpoints, newCheckpoint]);
  };


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={<HomePage checkpoints={checkpoints} />}
          />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/friends"
            element={<FriendsPage />}
          />
          <Route
            path="/checkpoints"
            element={<CheckpointsPage />}
          />
          <Route
            path="/add_checkpoint"
            element={<AddCheckpointPage addCheckpoint={addCheckpoint} />}
          />
          <Route path="/addfriends" element={<AddFriendPage />} />
          <Route path="/viewprofile" element = {<ViewUserProfile />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
