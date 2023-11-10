// FriendConfirmationPage.jsx
import React from 'react';
//import { Link } from 'react-router-dom';
import './FriendConfirmationPage.css';
//import friendImage from './path-to-travis-scott-image.jpg'; // Update with the correct path
import Header from '../../components/Header/Header';
function FriendConfirmationPage() {
  return (
    <div className="friend-confirmation-page">
      
      <Header />

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
