// FriendConfirmationPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './FriendConfirmationPage.css';
//import friendImage from './path-to-travis-scott-image.jpg'; // Update with the correct path

function FriendConfirmationPage() {
  return (
    <div className="friend-confirmation-page">
      <div className="header">
        <button className="back-button">Back</button>
        <div className="page-title">IDCollege</div>
      </div>

      <div className="confirmation-section">
        {/* <img src={friendImage} alt="Travis Scott" className="friend-image"/> */}
        <div className="friend-info">
          <div className="friend-name">Travis Scott</div>
          <button className="add-friend-button">+</button>
        </div>
      </div>
    </div>
  );
}

export default FriendConfirmationPage;
