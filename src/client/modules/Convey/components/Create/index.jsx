import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSocket } from '../../../../hooks/UseSocket';
import useProfileData from '../../../Auth/hooks/useProfileData';

const Create = () => {
  const history = useHistory();

  const socket = useSocket();
  const profileData = useProfileData({shouldRedirect: true});

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    socket.emit('convey', {type: 'createRoom', data: {owner: profileData.sub, name: name, description: description}});
    socket.on('createRoom', (room) => {
      history.push(`/room/${room.id}`);
    })
  }

  return (<>
    <label htmlFor="room-name-input">Room name</label>
    <input id="room-name-input" value={name} onChange={(e) => setName(e.target.value)} />

    <label htmlFor="room-description-input">Room description</label>
    <input id="room-description-input" value={description} onChange={(e) => setDescription(e.target.value)} />

    <button onClick={handleSubmit}>Create convey</button>
  </>)
}

export default Create