import React, { useState } from 'react';
import './AddFriendPage.css';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import FriendComponent from '../FriendsPage/FriendComponent/FriendComponent';

function AddFriendPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [friendExists, setFriendExists] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ name: "", progress: "" });
  const findUsername = new URLSearchParams(window.location.search);
  const username = findUsername.get('username');
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch("https://fastapi-hci-project-e870697179dd.herokuapp.com/check_friend", {
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
      setFriendExists(true);
      setUserDetails({ name: userName, progress: progress });
    } catch (error) {
      console.error("Friend not found:", error);
      setFriendExists(false);
    }
  };

  const handleConfirmAddFriend = () => {
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
        <button onClick={handleSearch} className="search-button">
          🔍
        </button>
      </div>
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
