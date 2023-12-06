// ViewUserProfile.js

import React, { useState, useEffect } from 'react';
import './ViewUserPage.css';
import Header from '../../components/Header/Header';
import Cookies from 'js-cookie';
const ViewUserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = new URLSearchParams(window.location.search).get('username');
  const friendname = new URLSearchParams(window.location.search).get('friendname');
  const data = Cookies.get(`user_${friendname}`);
  useEffect(() => {
    const fetchUserData = async () => {
      try {

        if (!username) {
          throw new Error('Username not provided in search params');
        }
        console.log(data);
        setUserData((data) ? JSON.parse(data) : data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="view-user-page">
      <Header username={username} />
      <div className="view-user-title" >
        {userData.username}
      </div>
      <div className="user-stats">
        <p>Applications Completed: {userData.applicationsCompleted}</p>
      </div>
      <div className="user-target-universities">
        <h2>{userData.username}'s Target Universities:</h2>
        <ul>
          {userData.targetUniversities.map((university, index) => (
            <li key={index}>{university}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewUserProfile;
