// FriendsPage.jsx
import React from 'react';
import "./FriendsPage.css"
import FriendComponent from './FriendComponent/FriendComponent';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

function FriendsPage({ friends }) {
  const renderFriendsList = () => {
    return friends.map((friend) => (
      <FriendComponent key={friend.id} friend={friend} />
    ));
  };

  return (
    <div className="friends-page">
        <Header/>
        <div className="friends-page-content">
          <h2>My Friends</h2>
          <div className="friends-list">{renderFriendsList()}</div>
          <Link to="/addfriends" className="add-friend-button">
            Add Friend
          </Link>
      </div>
    </div>
  );
}

export default FriendsPage;
