import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FriendComponent from './FriendComponent/FriendComponent';
import './FriendsPage.css';
import Header from '../../components/Header/Header';

class FriendsPage extends Component {
  constructor() {
    super();
    this.state = {
      friends: [
        { id: 1, name: 'Friend 1' },
        { id: 2, name: 'Friend 2' },
        { id: 3, name: 'Friend 3' },
        // ...other friends
      ],
    };
  }

  renderFriendsList() {
    // Map through friends and render the FriendComponent for each
    const listItems = this.state.friends.map((friend, index, array) => {
      // Check if the current friend is the last in the array
      const isLastFriend = index === array.length - 1;

      return (
        <React.Fragment key={friend.id}>
          <FriendComponent friend={friend} />
          {/* If it's the last friend, render the "Add a Friend" button below */}
          {isLastFriend && (
            <Link to="/addfriends" className="add-friend-button">
              Add a Friend
            </Link>
          )}
        </React.Fragment>
      );
    });

    return listItems;
  }

  render() {
    return (
      <div className="friends-page">
        <Header/>
        <h1>My Friends</h1>
        <div className="friends-list">{this.renderFriendsList()}</div>
      </div>
    );
  }
}

export default FriendsPage;
