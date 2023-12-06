import React, { useState } from 'react';
import './AddFriendPage.css';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import FriendComponent from '../FriendsPage/FriendComponent/FriendComponent';
import Cookies from 'js-cookie';

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
      // Attempt to find the friend in cookies
      const storedUser = Cookies.get(`user_${searchTerm}`);
      if (storedUser) {
        const friendData = JSON.parse(storedUser);
        setFriendExists(true);
        setUserDetails({ name: friendData.username, progress: friendData.progress });
      } else {
        throw new Error("Friend not found");
      }
    } catch (error) {
      console.error('Error in handleSearch:', error);
      setFriendError('Friend not found');
      setFriendExists(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setFriendError('');
  };

  const handleConfirmAddFriend = () => {
    try {
      // Attempt to find the friend in the user's friends list in cookies
      const storedFriends = Cookies.get(`friends_${username}`) || '[]';
      const friends = JSON.parse(storedFriends);

      // Check if the friend is not already in the friends list
      const friendExistsInList = friends.some(friend => friend.name === userDetails.name);

      if (!friendExistsInList) {
        friends.push({ name: userDetails.name, progress: userDetails.progress });
        Cookies.set(`friends_${username}`, JSON.stringify(friends));
      }
    } catch (error) {
      console.error('Error adding friend to friends list:', error);
    }

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
