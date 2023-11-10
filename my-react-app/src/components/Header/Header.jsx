import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Make sure to import your CSS file

const Header = () => {
  return (
    <div className="header-container">
      <div className="home-button">
        <div className="rectangle">
          <Link to="/home" className="home-link">
            Home
          </Link>
        </div>
      </div>
      <div className="header-text">IDCollege</div>
      <div className="logout-button">
        <div className='rectangle'>
            <Link to="/" className="logout-link">
            Sign Out
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
