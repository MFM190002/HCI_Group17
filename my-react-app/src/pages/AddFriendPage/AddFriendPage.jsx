import React, { useState } from 'react';
import './AddFriendPage.css';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import FriendComponent from '../FriendsPage/FriendComponent/FriendComponent';

function AddFriendPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [friendExists, setFriendExists] = useState(false);
  const [friendError, setFriendError] = useState('');
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ name: "", progress: "" });
  const findUsername = new URLSearchParams(window.location.search);
  const username = findUsername.get('username');

  const handleButtonClick = async () => {
    try {
      // Try handleSearch first
      await handleSearch();
    } catch (error) {
      // If handleSearch fails, catch the error here and then try searchFriendInSession
      console.error('Error in handleSearch:', error);

      try {
        await searchFriendInSession(searchTerm);
      } catch (searchError) {
        // Handle the error from searchFriendInSession if needed
        console.error('Error in searchFriendInSession:', searchError);
        setFriendError('Friend not found');
        setFriendExists(false);
      }
    }
  };

  const searchFriendInSession = async (searchTerm) => {
    try {
      const friendDataString = sessionStorage.getItem('userData');
      if (!friendDataString) {
        throw new Error("Friend not found in session storage");
      }

      const friendData = JSON.parse(friendDataString);
      if (friendData.username === searchTerm) {
        setFriendExists(true);
        setUserDetails({ name: friendData.firstName, progress: friendData.progress });
      } else {
        throw new Error("Friend not found");
      }
    } catch (error) {
      console.error("Friend not found:", error);
      setFriendExists(false);
      throw error;
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setFriendError('')
  };

  const handleSearch = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/check_friend", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: "john_doe", // replace with the actual username
          friend_name: searchTerm,
        }),
      });

      if (!response.ok) {
        throw new Error("Friend not found");
      }

      // Parse the response JSON
      const { userName, progress } = await response.json();
      console.log(userName);
      console.log(progress);
      // Set friend details to localStorage
      const storedFriends = localStorage.getItem("friends") || "[]";
      const friends = JSON.parse(storedFriends);
      friends.push({ name: userName, progress: progress });
      localStorage.setItem("friends", JSON.stringify(friends));

      setFriendExists(true);
      setUserDetails({ name: userName, progress: progress });
    } catch (error) {
      console.error("Friend not found:", error);
      setFriendExists(false);
      throw error;
    }
  };

  const handleConfirmAddFriend = () => {
    const friendDataString = sessionStorage.getItem('userData');
    if (friendDataString) {
      const friendData = JSON.parse(friendDataString);
      const storedFriends = localStorage.getItem("friends") || "[]";
      const friends = JSON.parse(storedFriends);
      
      // Check if the friend is not already in the friends list
      const friendExistsInList = friends.some(friend => friend.name === friendData.firstName);

      if (!friendExistsInList) {
        friends.push({ name: friendData.firstName, progress: friendData.progress });
        localStorage.setItem("friends", JSON.stringify(friends));
      }
    }
    // Perform any additional actions before navigating to the friends endpoint
    navigate(`/friends?username=${username}`);
  };

  return (
    <div className="add-friend-page">
      <Header username={username} />
      <div className="add-friend-title">
        Add a friend
      </div>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button onClick={handleButtonClick} className="search-button">
          🔍
        </button>
      </div>
      {friendError && <p className="friend-error">{friendError}</p>}
      {friendExists && (
        <div>
          {/* Render FriendComponent here */}
          <FriendComponent friend={userDetails} />
          <button onClick={handleConfirmAddFriend} className="confirm-add-friend">
            Confirm Add Friend
          </button>
        </div>
      )}
    </div>
  );
}

export default AddFriendPage;
