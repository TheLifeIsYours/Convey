import {Server, Socket} from 'socket.io'
import Room from '~server/api/Convey/models/Room/Room';

const io = (server: Server) => {
    console.log("socket.io connected");

    server.on('connection', (socket: Socket) => {
        //When client connects to room, fetch all messages related to room.
        socket.on('room-connect', async (data) => {
            console.log("room-connect:::");
            const room = convey.roomDao.getRoomById(data.roomId);

            if(room === undefined) return socket.emit('room-error', {type: 'connection', message: "Unable to find room"})

            if(room.connectClient(data.clientId)) {
                socket.emit('room-connect', room.getRoomJson());
                server.emit(`room-connect-${data.roomId}`, room.getRoomJson({messages: false}))
                return
            }
            
            return socket.emit('room-error', {type: 'connection', message: "Unable to connect"})
        });


        //TODO: on new client connecting to room, add client to list of clients by emitting to server room.

        socket.on('room-disconnect', (data) => {
            console.log("room-disconnect::");

            convey.roomDao.getRoomById(data.roomId)?.disconnectClient(data.clientId);
            server.emit(`room-disconnect-${data.roomId}`, convey.roomDao.getRoomById(data.roomId)?.getRoomJson({messages: false}))
        })

        socket.on('disconnect', (data) => {
            console.log("disconnect::", data);
        })

        socket.on(`room-message`, (data) => {
            let clientData = convey.clientDao.getClientById(data.sender);
            console.log("New Message::::", data)

            let message: any = convey.messageDao.createMessage(data);
            let room: Room = convey.roomDao.getRoomById(data.room)!!
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

                console.log(rooms);
                socket.emit('getRooms', rooms);
            }

            if(_event.type === 'getRoomsList') {
                socket.emit('getRoomsList', convey.roomDao.getRooms().map((room) => room.getRoomJson({messages: false})));
            }


            if(_event.type == 'message') {
                console.log('message:::');
                socket.emit('convey', {type: 'message', data: {room: convey.roomDao.getRoomById(_event.data.room.id)}});
            }

        });

        socket.on('profile', (_event) => {
            console.log('profile:::');

            if(_event.type == 'edit') {
                console.log('edit:::');
                const {sub, display_name} = _event.data

                const client = convey.clientDao.getClientById(sub)
                if(client) client.DisplayName = display_name
            }
        })
    });
};

export default io