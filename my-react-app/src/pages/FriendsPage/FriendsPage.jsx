// FriendsPage.jsx
import React, { useState, useEffect } from 'react';
import FriendComponent from './FriendComponent/FriendComponent';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import "./FriendsPage.css"

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  const username = queryParams.get('username')
  useEffect(() => {
    // Fetch friends list from the backend when the component mounts
    fetchFriendsList(username);
  }, [username]); // The empty dependency array means this effect runs once, similar to componentDidMount

  const fetchFriendsList = async (username) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get_friends_list?username=${username}`, {
        method: "GET",
        credentials:'include',
      });

      if (!response.ok) {
        throw new Error("Failed to fetch friends list");
      }

      const data = await response.json();
      console.log(data.friends);
      setFriends(data.friends);
    } catch (error) {
      console.error("Error fetching friends list:", error);
    }
  };

  const renderFriendsList = () => {
    return friends.map((friend) => (
      <FriendComponent key={friend.id} friend={friend.name} />
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
