import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import Header from '../../components/Header/Header';
import Cookies from 'js-cookie';

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const username = new URLSearchParams(window.location.search).get('username');
  const data = Cookies.get(`user_${username}`);
  const [editingUniversityIndex, setEditingUniversityIndex] = useState(null);
  const [newUniversity, setNewUniversity] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!username) {
          throw new Error('Username not provided in search params');
        }
        
        console.log(data);
        setProfileData(data ? JSON.parse(data) : data); // Initialize with an empty object if data is null
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  // eslint-disable-next-line
  }, [username]);
  

  const handleIncrementApplications = () => {
    const isConfirmed = window.confirm(`Are you sure you completed an application?`);
    if (isConfirmed) {
      setProfileData((prevData) => ({
        ...prevData,
        applicationsCompleted: (prevData.applicationsCompleted || 0) + 1,
      }));
    }
  };

  useEffect(() => {
    const saveProfileToCookie = () => {
      Cookies.set(`user_${username}`, JSON.stringify(profileData));
    };

    saveProfileToCookie();
  }, [profileData, username]);

  const handleAddUniversity = () => {
    if (newUniversity.trim() !== '') {
      setProfileData((prevData) => ({
        ...prevData,
        targetUniversities: [...(prevData.targetUniversities || []), newUniversity],
      }));
      setNewUniversity('');
    }
  };

  const handleEditUniversity = (index) => {
    setEditingUniversityIndex(index);
    setNewUniversity(profileData.targetUniversities[index]);
  };

  const handleSaveUniversityEdit = () => {
    setProfileData((prevData) => {
      const updatedUniversities = [...(prevData.targetUniversities || [])];
      updatedUniversities[editingUniversityIndex] = newUniversity;
      return {
        ...prevData,
        targetUniversities: updatedUniversities,
      };
    });
    setEditingUniversityIndex(null);
    setNewUniversity('');
  };

  const handleDeleteUniversity = (index) => {
    setProfileData((prevData) => ({
      ...prevData,
      targetUniversities: (prevData.targetUniversities || []).filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-user-page">
      <Header username={username} />
      <div className="edit-user-title">{username}</div>
      <div className="edit-user-stats">
        <div>
          <p>Applications Completed: {profileData.applicationsCompleted || 0}</p>
          <button onClick={handleIncrementApplications}>Increment Applications</button>
        </div>
        <div>
          <h2>Target Universities</h2>
          <ul>
            {(profileData.targetUniversities || []).map((university, index) => (
              <li key={index}>
                {index === editingUniversityIndex ? (
                  <>
                    <input
                      type="text"
                      value={newUniversity}
                      onChange={(e) => setNewUniversity(e.target.value)}
                    />
                    <button onClick={handleSaveUniversityEdit}>Save</button>
                  </>
                ) : (
                  <>
                    {university}
                    <button onClick={() => handleEditUniversity(index)}>Edit</button>
                    <button onClick={() => handleDeleteUniversity(index)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              placeholder="Add new university"
              value={newUniversity}
              onChange={(e) => setNewUniversity(e.target.value)}
            />
            <button onClick={handleAddUniversity}>Add University</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
