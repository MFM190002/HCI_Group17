import React, { useState } from 'react';
import './AddFriendPage.css';
import Header from '../../components/Header/Header';
function AddFriendPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // Implement the search functionality here
    console.log('Search for:', searchTerm);
  };

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
        <button onClick={handleSearch} className="search-button">
          🔍
        </button>
      </div>
    </div>
  );
}

export default AddFriendPage;
