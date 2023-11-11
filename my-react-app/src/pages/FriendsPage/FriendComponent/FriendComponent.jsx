import React from 'react';
import './FriendComponent.css';

const FriendComponent = ({ friend }) => {
  return (
    <div className="friend">
      <div className="friend-info-component">
        <span className="friend-name">{friend.name}</span>
        <span className="friend-id">ID: {friend.id}</span>
      </div>
    </div>
  );
};

export default FriendComponent;
