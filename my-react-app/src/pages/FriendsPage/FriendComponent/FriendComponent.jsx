import React from 'react';
import './FriendComponent.css';
import { Link } from "react-router-dom";

const FriendComponent = ({ friend }) => {
  return (
    <div className="friend">
      <div className="friend-info-component">
        <span className="friend-name">{friend.name}</span>
        <span className="friend-id">Progress: {friend.progress}</span>
        <Link to={`/viewprofile?username=${friend.name}`}>
              View Profile
        </Link>
      </div>
    </div>
  );
};

export default FriendComponent;
