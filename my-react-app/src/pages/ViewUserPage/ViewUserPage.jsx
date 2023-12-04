// ViewUserProfile.js

import React, { useState, useEffect } from 'react';
import './ViewUserPage.css';
import Header from '../../components/Header/Header';
const ViewUserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = new URLSearchParams(window.location.search).get('username');

        if (!username) {
          throw new Error('Username not provided in search params');
        }

        const response = await fetch(`http://127.0.0.1:8000/get_user_info?username=${username}`);
        const data = await response.json();

        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="view-user-page">
      < Header />
      <div className="view-user-title" >
        {userData.username}
      </div>
      <div className="user-stats">
        <p>Checkpoints Completed: {userData.checkpointsCompleted}</p>
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
