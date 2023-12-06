// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ username }) => {
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const handleDropdownToggle = (event) => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="header-container">
      <Link to={`/home?username=${username}`} className="home-button">
        <div className="rectangle">
          <span className="home-link">Home</span>
        </div>
      </Link>
      <div className="header-text">IDCollege</div>
      <div className="dropdown-container">
        <div className="user-settings-button">
          <div className="rectangle">
            <span className="user-settings-link" onClick={handleDropdownToggle}>User Settings</span>
          </div>
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <Link to={`/editprofile?username=${username}`} className="dropdown-item">
              Edit Profile
            </Link>
            <Link to="/" className="dropdown-item">
              Sign Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
