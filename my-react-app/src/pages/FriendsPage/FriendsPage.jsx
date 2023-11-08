import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

import FriendComponent from './FriendComponent/FriendComponent'; // Import your FriendComponent here

import './FriendsPage.css'; // Import the CSS file

class FriendsPage extends Component {
  constructor() {
    super();
    this.state = {
      friends: [
        // Initialize this array with your current friends' data
        { id: 1, name: 'Friend 1' },
        { id: 2, name: 'Friend 2' },
        // Add more friends as needed
      ],
    };
  }

  renderFriendsList() {
    return this.state.friends.map((friend) => (
      <FriendComponent key={friend.id} friend={friend} />
    ));
  }

  render() {
    return (
      <div className="friends-page">
        <h1>My Friends</h1>
        <div className="friends-list">{this.renderFriendsList()}</div>
        <Link to="/addfriends" className="add-friend-button">
          Add a Friend
        </Link>
      </div>
    );
  }
}

export default FriendsPage;
