import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import { JourneyPage } from './pages/JourneyPage/JourneyPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import AddFriendPage from './pages/AddFriendPage/AddFriendPage';
import FriendConfirmationPage from './pages/FriendConfirmationPage/FriendConfirmationPage';
import AddCheckpointPage from './pages/AddCheckpointPage/AddCheckpointPage';
import CheckpointsPage from './pages/CheckpointsPage/CheckpointsPage';
function App() {
  const [checkpoints, setCheckpoints] = React.useState(['Draft College Essay', 'Fill out FAFSA', 'Start UTD App']);

  // Function to add a new checkpoint to the list
  const addCheckpoint = (newCheckpoint) => {
    setCheckpoints((prevCheckpoints) => [...prevCheckpoints, newCheckpoint]);
  };

  const [friends, setFriends] = React.useState([
    { progress: 1, name: 'Friend 1' },
    { progress: 2, name: 'Friend 2' },
    { progress: 3, name: 'Friend 3' },
    // ...other friends
  ]);

  // Function to add a new friend to the list
  const addFriend = (newFriend) => {
    setFriends((prevFriends) => [...prevFriends, newFriend]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={<HomePage checkpoints={checkpoints} friends={friends} />}
          />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/friends"
            element={<FriendsPage friends={friends} />}
          />
          <Route path="/friendsconfirmation" element={<FriendConfirmationPage addFriend={addFriend}/>} />
          <Route
            path="/checkpoints"
            element={<CheckpointsPage checkpoints={checkpoints} />}
          />
          <Route
            path="/addcheckpoint"
            element={<AddCheckpointPage addCheckpoint={addCheckpoint} />}
          />
          <Route path="/addfriends" element={<AddFriendPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
