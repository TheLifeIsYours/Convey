const io = (server) => {
    console.log("socket.io connected");

    server.on('connection', (socket) => {

        socket.on('ping', () => {
            socket.emit('pong', "pong")
        })

        //When client connects to room, fetch all messages related to room.
        socket.on('room-connect', async (data) => {
            console.log("room-connect:::");
            const room = convey.roomDao.getRoomById(data.roomId);

            if(room === undefined) return socket.emit('room-error', {type: 'connection', message: "Unable to find room"})

            if(room.connectClient(data.clientId)) {
                socket.emit('room-connect', room.getRoomJson());
                server.emit(`room-connect-${data.roomId}`, convey.roomDao.getRoomById(data.roomId))
                return
            }
            
            return socket.emit('room-error', {type: 'connection', message: "Unable to connect"})
        });

        socket.on('room-disconnect', (data) => {
            console.log("room-disconnect::");

            convey.roomDao.getRoomById(data.roomId)?.disconnectClient(data.clientId);
            server.emit(`room-disconnect-${data.roomId}`, convey.roomDao.getRoomById(data.roomId))
        })

        socket.on('disconnect', (data) => {
            console.log("disconnect::", data);
        })

        socket.on(`room-message`, (data) => {
            let clientData = convey.clientDao.getClientById(data.sender);
            console.log("New Message::::", data)

            let message = convey.messageDao.createMessage(data);
            let room = convey.roomDao.getRoomById(data.room)
            room.addMessage(message)

            server.emit(`room-message-${data.room}`, {...message, user: clientData});
        })

        socket.on('convey', async (_event) => {
            console.log({_event});

            if(_event.type == 'createRoom') {
                console.log('createRoom:::');
                socket.emit('createRoom', convey.roomDao.createRoom(_event.data));
            }

            if(_event.type === 'getRooms') {
                console.log('getRoom:::');
                let rooms = convey.roomDao.getRooms();
                console.log(rooms)
                socket.emit('getRooms', rooms);
            }


            if(_event.type == 'message') {
                console.log('message:::');
                socket.emit('convey', {type: 'message', data: {room: convey.roomDao.getRoomById(_event.data.room.id)}});
            }

        });
    });
};

module.exports = io