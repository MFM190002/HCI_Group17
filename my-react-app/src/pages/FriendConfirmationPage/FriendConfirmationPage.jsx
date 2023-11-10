// FriendConfirmationPage.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './FriendConfirmationPage.css';
import Header from '../../components/Header/Header';

function FriendConfirmationPage({ addFriend }) {
  const navigate = useNavigate();
  const { friendName } = useParams();

  const handleAddFriend = () => {
    // Assuming you have the friend details available
    const newFriend = { id: 4, name: "Travis Scott" }; // Update with actual details

    addFriend(newFriend);

    // Navigate back to the FriendsPage
    navigate('/friends'); // Update with the actual path of the FriendsPage
  };

  return (
    <div className="friend-confirmation-page">
      <Header />
      <div className="confirmation-section">
        <div className="friend-info">
          <div className="friend-name">Travis Scott</div>
          <button className="add-friend-button" onClick={handleAddFriend}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendConfirmationPage;
