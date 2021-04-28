import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSocket } from '../../../../hooks/UseSocket'

const List = () => {
  const socket = useSocket()
  
  const [listenersIsSet, setListenersIsSet] = useState(false);

  const [rooms, setRooms] = useState([]);
  const roomsRef = useRef(rooms);
  roomsRef.current = rooms;

  //Get available rooms
  useEffect(() => {
    socket.emit('convey', {type: 'getRooms'});

    socket.on('getRooms', (data) => {
      if(data) setRooms(data)
    });

    return () => socket.disconnect();
  }, []);

  //Update room information when users leave and enter rooms
  useEffect(() => {
    if(rooms.length && !listenersIsSet) {
      rooms.forEach((room) => { 

        socket.on(`room-connect-${room.id}`, (roomData) => {
          console.log(`room-connect-${room.id}`);
          
          setRooms(roomsRef.current.map(roomRef => {
            if(roomRef.id == roomData.id) {
              return roomData
            }

            return roomRef
          })
        )
        })

        socket.on(`room-disconnect-${room.id}`, (roomData) => {
          console.log(`room-disconnect-${room.id}`)
          
          setRooms(roomsRef.current.map(roomRef => {
              if(roomRef.id == roomData.id) {
                return roomData
              }

              return roomRef
            })
          )
        })

      })

      setListenersIsSet(true);
    }
  }, [rooms])

  return (<>
    {rooms.map((room, key) => {
      return (<div key={key} className="room-item">
        <h1>{room.name}</h1>
        <h1>Users: {room.clients.length}</h1>
        <Link to={`/room/${room.id}`}>Enter conversation</Link>
      </div>)
    })}
  </>)
}

export default List