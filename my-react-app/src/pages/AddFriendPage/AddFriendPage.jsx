// AddFriendPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddFriendPage.css';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';

function AddFriendPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [friendExists, setFriendExists] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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

      setFriendExists(true);

      // Navigate to FriendConfirmationPage with the search term
      // Use the actual path of FriendConfirmationPage
      navigate(`/friendsconfirmation/${searchTerm}`);
    } catch (error) {
      console.error("Friend not found:", error);
      setFriendExists(false);
    }
  };

  return (
    <div className="add-friend-page">
      <Header />
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
    </div>
  );
}

export default AddFriendPage;
