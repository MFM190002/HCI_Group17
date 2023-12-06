import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import Header from '../../components/Header/Header';
import Cookies from 'js-cookie';

const Profile = () => {
const username = new URLSearchParams(window.location.search).get('username');
  const [profileData, setProfileData] = useState({
    applicationsCompleted: 0,
    targetUniversities: [],
  });
  const [editingUniversityIndex, setEditingUniversityIndex] = useState(null);
  const [newUniversity, setNewUniversity] = useState('');

  useEffect(() => {
    const fetchProfileData = () => {
      const storedProfileData = Cookies.get(`profile_${username}`);
      if (storedProfileData) {
        setProfileData(JSON.parse(storedProfileData));
      }
    };

    fetchProfileData();
  }, [username]);

  const handleIncrementApplications = () => {
    setProfileData((prevData) => ({
      ...prevData,
      applicationsCompleted: prevData.applicationsCompleted + 1,
    }));
  };

  const handleAddUniversity = () => {
    if (newUniversity.trim() !== '') {
      setProfileData((prevData) => ({
        ...prevData,
        targetUniversities: [...prevData.targetUniversities, newUniversity],
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
      const updatedUniversities = [...prevData.targetUniversities];
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
      targetUniversities: prevData.targetUniversities.filter((_, i) => i !== index),
    }));
  };

  const saveProfileToCookie = () => {
    Cookies.set(`profile_${username}`, JSON.stringify(profileData));
  };

  useEffect(() => {
    saveProfileToCookie();
  }, [profileData, username]);

  return (
    <div className="edit-user-page">
      <Header/>
      <div className="edit-user-title">
        {username}
      </div>
      <div className="edit-user-stats">
        <div>
            <p>Applications Completed: {profileData.applicationsCompleted}</p>
            <button onClick={handleIncrementApplications}>Increment Applications</button>
        </div>
        <div>
            <h2>Target Universities</h2>
            <ul>
            {profileData.targetUniversities.map((university, index) => (
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
