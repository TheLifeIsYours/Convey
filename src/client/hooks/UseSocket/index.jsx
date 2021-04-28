import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";
export const useSocket = (params) => {
  let [socket, setSocket] = useState(socketIOClient('https://localhost:8443'));
  useEffect(() => {
    return () => {
      if(params?.selfClose === true || params?.selfClose === undefined) socket.disconnect();
    }
  }, [])

  return socket;
}