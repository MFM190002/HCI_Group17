import React, { useState } from 'react';
import './CheckpointComponent.css';

const CheckpointComponent = ({ checkpoint, onCheckClick, onCheckEdit, onCheckDelete, completed, disableActions }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedCheckpoint, setEditedCheckpoint] = useState(checkpoint);

  const handleClick = () => {
    if (!completed && !disableActions) {
      onCheckClick(checkpoint);
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleEditConfirm = () => {
    console.log('Edited checkpoint:', editedCheckpoint);
    onCheckEdit(editedCheckpoint, checkpoint);
    setEditing(false);
    setDropdownOpen(false);
  };

  const handleDelete = () => {
    if (!disableActions) {
      onCheckDelete(checkpoint);
    }
    setDropdownOpen(false);
  };

  const handleUndo = () => {
    onCheckClick(checkpoint);
    setDropdownOpen(false);
  };

  const handleInputChange = (event) => {
    setEditedCheckpoint(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleEditConfirm();
    }
  };

  const cursorStyle = (completed || disableActions) ? 'default' : 'pointer';

  return (
    <div className={`home-checkpoint ${completed ? 'completed' : ''} ${disableActions ? 'home-checkpoint-actions-disabled' : ''}`}>
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
            style={{ height: '40px', width: '200px', fontSize: '16px' }}
            autoFocus
          />
        ) : (
          <>
            <span>{editedCheckpoint}</span>
            {completed && <span style={{ marginLeft: '10px' }}>✅</span>}
          </>
        )}
        <div className="dropdown" style={{ marginLeft: '20px', marginRight: '10px' }}>
          <button className="dropdown-btn" onClick={handleDropdownToggle}>
            ...
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">
              {completed ? (
                <>
                  {!disableActions && <button onClick={handleUndo}>Undo</button>}
                  {!disableActions && <button onClick={handleDelete}>Delete</button>}
                </>
              ) : (
                <>
                  {!disableActions && <button onClick={handleEdit}>Edit</button>}
                  {!disableActions && <button onClick={handleDelete}>Delete</button>}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckpointComponent;
