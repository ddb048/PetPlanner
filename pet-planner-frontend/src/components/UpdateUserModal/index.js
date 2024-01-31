import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { update } from '../../store/session';

const UpdateUserModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);

  // State for updated user information
  const [username, setUsername] = useState(user?.username || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePic, setProfilePic] = useState(user?.profilePic || '');

  const urlValidation = str => {
    return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'oldPassword':
        setOldPassword(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'profilePic':
        setProfilePic(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate URL before dispatching the action
    if (!urlValidation(profilePic)) {
      // Handle invalid URL case (show an error, for example)
      console.error('Invalid Profile Picture URL');
      return;
    }

    // Dispatch the action to update the user
    dispatch(update({
      id: user.id,
      username,
      oldPassword,
      newPassword,
      email,
      profilePic,
    }));

    // You may also include navigation logic or any other actions you want to perform after updating the user
    navigate('/'); // Redirect to the home page, for example
  };

  return (
    <div className='modal-backdrop'>
      <div className="modal">
        <div className='modal-content'>
          <div className='modal-title'>Update User</div>
          <form onSubmit={handleSubmit}>
            <div className="update-user__errors"></div>

            <div className="update-user__input-container">
              <label htmlFor="username" className="update-user__label">
                Username
              </label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="update-user__input"
                value={username}
                onChange={handleInputChange}
              />
            </div>

            <div className="update-user__input-container">
              <label htmlFor="oldPassword" className="update-user__label">
                Old Password
              </label>
              <input
                name="oldPassword"
                type="password"
                placeholder="Old Password"
                className="update-user__input"
                value={oldPassword}
                onChange={handleInputChange}
              />
            </div>

            <div className="update-user__input-container">
              <label htmlFor="newPassword" className="update-user__label">
                New Password
              </label>
              <input
                name="newPassword"
                type="password"
                placeholder="New Password"
                className="update-user__input"
                value={newPassword}
                onChange={handleInputChange}
              />
            </div>

            <div className="update-user__input-container">
              <label htmlFor="email" className="update-user__label">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="update-user__input"
                value={email}
                onChange={handleInputChange}
              />
            </div>

            <div className="update-user__input-container">
              <label htmlFor="profilePic" className="update-user__label">
                Profile Picture URL
              </label>
              <input
                name="profilePic"
                type="text"
                placeholder="Profile Picture URL"
                className="update-user__input"
                value={profilePic}
                onChange={handleInputChange}
              />
            </div>
            <div className="update-user__button-container">
              <button className="update-user__button" type="submit">
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
