import React, { useState, useEffect } from 'react';

const UserDisplay = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    
    fetch('http://localhost:8080/api/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  return (
    <div>
      <h1>User Information:</h1>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDisplay;