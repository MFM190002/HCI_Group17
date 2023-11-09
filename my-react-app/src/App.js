import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import { JourneyPage } from './pages/JourneyPage/JourneyPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import AddFriendPage from './pages/AddFriendPage/AddFriendPage';
import FriendConfirmationPage from './pages/FriendConfirmationPage/FriendConfirmationPage';
import AddCheckpointPage from './pages/AddCheckpointPage/CheckpointConfirmationPage';
import CheckpointsPage from './pages/CheckpointsPage/CheckpointsPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/friends" element={<FriendsPage/>}/>
          <Route path="/friendsconfirmation" element={<FriendConfirmationPage/>}/>
          <Route path="/checkpoints" element={<CheckpointsPage/>}/>
          <Route path="/addcheckpoint" element={<AddCheckpointPage/>}/>
          <Route path="/addfriends" element={<AddFriendPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
