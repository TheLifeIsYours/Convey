const ClientDao = require('./data/ClientDao/ClientDao');
const MessageDao = require('./data/MessageDao/MessageDao');
const RoomDao = require('./data/RoomDao/RoomDao');
const Client =  require('./models/Client/Client')

module.exports = new class Convey {
  messageDao = new MessageDao();
  clientDao = new ClientDao();
  roomDao = new RoomDao();

  constructor(){};

  createClient(userInfo) {
    const client = new Client(userInfo);
    this.clientDao.addClient(client);
    return client;
  }

  clientExists(userInfo) {
    if(this.clientDao.getClient(userInfo) !== null) return true;
    return false;
  }

  getUniqueRoomId() {
    let rndId = require('crypto').randomBytes(32).toString('hex');
    let exists = this.roomDao.rooms.find((room) => room.id === rndId)

    if(exists) {
      return this.getUniqueRoomId();
    }

    return rndId;
  }

  getUniqueMessageId() {
    let rndId = require('crypto').randomBytes(32).toString('hex');
    let exists = this.messageDao.messages.find((message) => message.id === rndId);

    if(exists) {
      return this.getUniqueMessageId();
    }

    return rndId;
  }
}