import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Make sure to import your CSS file

const Header = ({ username }) => {
  return (
    <div className="header-container">
      <Link to={`/home?username=${username}`} className="home-button">
        <div className="rectangle">
          <span className="home-link">Home</span>
        </div>
      </Link>
      <div className="header-text">IDCollege</div>
      <Link to="/" className="logout-button">
        <div className="rectangle">
          <span className="logout-link">Sign Out</span>
        </div>
      </Link>
    </div>
  );
};

export default Header;
