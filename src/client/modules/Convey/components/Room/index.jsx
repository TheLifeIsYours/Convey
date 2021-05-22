import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSocket } from '../../../../hooks/UseSocket';

import useProfileData from '../../../Auth/hooks/useProfileData';
import Message from './components/Message';

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

    socket.on(`room-connect-${params.id}`, (data) => {
      setRoom({
        ...roomRef.current,
        clients: data.clients
      });
    })

    socket.on(`room-disconnect-${params.id}`, (data) => {
      setRoom({
        ...roomRef.current,
        clients: data.clients
      });
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

  //Scroll to bottom
  useEffect(() => {
    let msgContainer = document.querySelector('#room-message-container')
    msgContainer.scrollTop = msgContainer.scrollHeight
  }, [room.messages])

  return (
    <div id="room-main">
      <div id="room-header">
        <h1>{room.name}</h1>
        <p>{room.description}</p>
      </div>

      <div id="room-chat-container">
        <div id="room-message-container">{
          room.messages.slice().map((message, key, messages) => {

            return (
              <div key={key} className="chat-message">
                <img className="chat-message-sender-image" src={message.user?.picture}/>
                <div className="chat-message-sender">
                  <div className="chat-message-sender-name">{message.user?.display_name}</div>
                  <div className="chat-message-time">{new Date(message.time).toLocaleTimeString()}</div>
                </div>

                <Message className="chat-message-text" text={message.text} />

                {messages.slice(key-1).map((subMessage, key, subMessages) => {
                  let prevMessage = subMessages[key-1];

                  if(
                    key > 0 &&
                    subMessage.sender == message.sender &&
                    subMessage.sender == prevMessage.sender &&
                    subMessage.time - message.time < 60000
                  ) {
                    messages.splice(key, 1)
                    return (<Message key={key} className="chat-message-text" text={subMessage.text} />)
                  }
                })}
              </div>
            )
          })
        }</div>

        <form id="message-form" onSubmit={handleSubmit} autoComplete="off">
          <input type="text" id="message-input" name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          
          {/* <button id="message-button" type="submit">Convey</button> */}
        </form>
      </div>
      <div id="room-user-list">
        {room.clients.map((user, key) => {
          return (
            <div className="room-user-list-item" key={key}>
              <img className="room-user-list-item-image" src={user.picture} />
              <div className="room-user-list-item-name" >{user.display_name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Room