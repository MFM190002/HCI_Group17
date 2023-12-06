import React, { useState, useEffect } from 'react';
import FriendComponent from './FriendComponent/FriendComponent';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Cookies from 'js-cookie';
import "./FriendsPage.css"

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('username')

  useEffect(() => {
    // Fetch friends list from localStorage when the component mounts
    const storedFriends = Cookies.get(`friends_${username}`) || '[]';
    setFriends(JSON.parse(storedFriends));
  }, [username]);

  const renderFriendsList = () => {
    return friends.map((friend, index) => (
      <FriendComponent key={index} friend={friend} username={username}/>
    ));
  };

  return (
    <div className="friends-page">
      <Header username={username} />
      <div className="friends-page-content">
        <h2>My Friends</h2>
        <div className="friends-list">{renderFriendsList()}</div>
        <div className='add-friend-button-container'>
          <Link to={`/addfriends?username=${username}`} className="add-friend-button-1">
            Add Friend
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FriendsPage;
