// CheckpointComponent.js
import React, { useState } from 'react';
import './CheckpointComponent.css';

const CheckpointComponent = ({ checkpoint, onCheckClick, onCheckDelete, completed }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedCheckpoint, setEditedCheckpoint] = useState(checkpoint);

  const handleClick = () => {
    // Only allow clicking if the checkpoint is not completed
    if (!completed) {
      onCheckClick(checkpoint);
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
    setEditing(false); // Close editing mode when opening/closing dropdown
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleEditConfirm = () => {
    // Add your logic for handling the edited name confirmation
    // For example, you might want to update the checkpoint name in the state or trigger an API call
    console.log('Edited checkpoint:', editedCheckpoint);
    setEditing(false); // Exit editing mode
    setDropdownOpen(false);
  };

  const handleDelete = () => {
    onCheckDelete(checkpoint);
    setDropdownOpen(false);
  };

  const handleInputChange = (event) => {
    setEditedCheckpoint(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission behavior
      handleEditConfirm();
    }
  };

  const cursorStyle = completed ? 'default' : 'pointer';

  return (
    <div className={`home-checkpoint ${completed ? 'completed' : ''}`}>
      <div
        className="home-checkpoint-text"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <div
          className="home-checkpoint-icon"
          onClick={handleClick}
          style={{ cursor: cursorStyle, marginRight: '10px' }}
        >
        </div>
        {editing ? (
          <input
            type="text"
            value={editedCheckpoint}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onBlur={handleEditConfirm}
            style={{ height: '40px', width: '200px', fontSize: '16px' }} // Adjust the height and width as needed
            autoFocus
          />
        ) : (
          <>
            <span>{editedCheckpoint}</span>
            {completed && <span style={{ marginLeft: '10px' }}>✅</span>}
          </>
        )}
        <div className="dropdown" style={{ marginLeft: '10px'}}>
          <button className="dropdown-btn" onClick={handleDropdownToggle}>
            ...
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckpointComponent;
