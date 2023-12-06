import './App.css';
import React, { useEffect } from 'react';
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
import Cookies from 'js-cookie';
import Profile from './pages/EditProfile/EditProfile';

function App() {
  useEffect(() => {
    // Updated dummy user data with friends and checkpoints
    const dummyUsers = {
      john_doe: {
        firstName: 'John',
        password: 'secret123',
        progress: '20',
        friends: [
          { username:'jimmy', name: 'Jim', progress: '20%' },
          { username:'bobdun', name: 'Bob', progress: '10%' },
        ],
        checkpoints: ['Draft College Essay', 'Fill out FAFSA', 'Start UTD App'],
        completedCheckpoints: [],
      },
      alice_smith: {
        firstName: 'Alice',
        password: 'password123',
        progress: '30',
        friends: [
          { username:'jimmy', name: 'Jim', progress: '20%' },
          { username:'bobdun', name: 'Bob', progress: '10%' },
          { username: 'sanjaysharm', name: 'Sanjay', progress: '15%' },
        ],
        checkpoints: ['Draft College Essay', 'Fill out FAFSA', 'Start UTD App'],
        completedCheckpoints: [],
      },
      // Add more dummy users as needed
      harry_cooper: {
        firstName: 'Harry',
        password: 'bunnies43',
        progress: '50',
        friends: [
          { username:'jimmy', name: 'Jim', progress: '20%' },
          { username:'bobdun', name: 'Bob', progress: '10%' },
        ],
        checkpoints: ['Draft College Essay', 'Fill out FAFSA', 'Start UTD App'],
        completedCheckpoints: [],
      },
      bob_smith: {
        username: 'bob_smith',
        password: "password123",
        progress : "20%",
        checkpointsCompleted: 5,
        applicationsCompleted: 5,
        targetUniversities: ["UT Dallas", "Stanford", "Colin College"]
    },
    };

    // Set cookies for each dummy user
    Object.keys(dummyUsers).forEach((username) => {
      const userData = dummyUsers[username];
      Cookies.set(`user_${username}`, JSON.stringify(userData));
      // Optionally, store friends and checkpoints in cookies
      Cookies.set(`friends_${username}`, JSON.stringify(userData.friends || []));
      Cookies.set(`checkpoints_${username}`, JSON.stringify(userData.checkpoints || []));
    });

    // Optionally, you can set a global cookie for authentication status or other shared information
    Cookies.set('authenticated', 'true');
  }, []);

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
          <Route path="/editprofile" element = {<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
