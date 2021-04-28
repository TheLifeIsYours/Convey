import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSocket } from '../../../../hooks/UseSocket';
import useProfileData from '../../../Auth/hooks/useProfileData';

import './styles.css'

const Room = () => {
  const history = useHistory()
  const params = useParams();

  const profileData = useProfileData({shouldRedirect: true});
  const socket = useSocket({selfClose: false});

  //Room data state
  const [room, setRoom] = useState({
    id: '',
    owner: '',
    name: '',
    description: '',
    clients: [],
    messages: []
  });

  const roomRef = useRef(room);
  roomRef.current = room;

  //Entered message state
  const [message, setMessage] = useState("");
  const messageRef = useRef(message);
  messageRef.current = message;

  //Handle message submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if(messageRef.current.length <= 0) return;

    socket.emit(`room-message`, {
      room: params.id,
      sender: profileData.sub,
      text: messageRef.current,
      time: Date.now()
    })

    setMessage("");
  }

  //Wait for profileData to be available, and submit a connect request
  useEffect(() => {
    if(profileData.sub !== '') socket.emit(`room-connect`, {roomId: params.id, clientId: profileData.sub});
  }, [profileData])


  useEffect(() => {
    //Wait for room data
    socket.on(`room-connect`, (data) => {
      if(data) {
        console.log("ROOM DATA:::", data);
        setRoom(data);
      } else {
        history.push('/rooms')
      }
    })

    //Listen for incoming messages
    socket.on(`room-message-${params.id}`, (data) => {
      setRoom({
        ...roomRef.current,
        messages: [
          ...roomRef.current.messages, data
        ]
      });
    })

    //Cleanup when leaving room
    return () => {
      socket.emit('room-disconnect', {roomId: params.id, clientId: profileData.sub}).disconnect();
    }
  }, [])

  return (<>
    <h1>{room.name}</h1>
    <p>{room.description}</p>
    
    <div id="chat-message-container">{
      room.messages.map((message, key) => { return (
        <div key={key} className="chat-message">
          <img className="chat-message-sender-image" src={message.user?.picture}/>
          <div className="chat-message-sender">
            <div className="chat-message-sender-name">{message.user?.name}</div>
            <div className="chat-message-time">{new Date(message.time).toLocaleTimeString()}</div>
          </div>
          <div className="chat-message-text">{message.text}</div>
        </div>
      )})
    }</div>

    <form id="message-form" onSubmit={handleSubmit}>
      <input type="text" id="message-input" name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      
      <button id="message-button" type="submit">Convey</button>
    </form>
  </>)
}

export default Room