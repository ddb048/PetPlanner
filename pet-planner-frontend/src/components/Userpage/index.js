import React, { useEffect, useState } from 'react';
import EventsList from '../EventsList';
import DisplayPets from '../PetsPage';
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
          <div>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>

          </div>
          <div>
            <DisplayPets />
          </div>
          <div>
            <EventsList />
          </div>
        </div>

      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDisplay;
