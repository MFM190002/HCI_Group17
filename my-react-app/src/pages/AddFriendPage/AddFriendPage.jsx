// AddFriendPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddFriendPage.css';
import Header from '../../components/Header/Header';

function AddFriendPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // const handleSearch = () => {
  //   // Navigate to FriendConfirmationPage with the search term
  //   console.log('Search for:', searchTerm);
  // };

  return (
    <div className="add-friend-page">
      <Header />
      
      <div className="search-section">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <Link to={`/friendsconfirmation`} className="search-button">
          🔍
        </Link>
      </div>
    </div>
  );
}

export default AddFriendPage;
