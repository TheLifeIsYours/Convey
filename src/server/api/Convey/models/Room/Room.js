const Message = require("../Message/Message");

module.exports = class Room {
  constructor(roomData, id) {
    this.id = roomData?.id || id || global.convey?.getUniqueRoomId();
    this.owner = roomData?.owner;
    this.name = roomData?.name;
    this.description = roomData?.description;
    this.clients = roomData?.clients || [];
    this.messages = roomData?.messages || [];
  }
  
  //Register existing client as connected to the room, if client is not already connected.
  connectClient(clientId) {
    const client = convey.clientDao.getClientById(clientId);
    console.log(client)

    if(client) {
      let existingClient = this.clients.find(sub => sub === client.sub);

      if(!existingClient) {
        this.clients.push(client.sub);
      }
      
      convey.roomDao.writeRoom(this);
      return true;
    }

    return false;
  }

  disconnectClient(clientId) {
    let client = convey.clientDao.getClientById(clientId);

    if(client) {
      this.clients.splice(this.clients.indexOf(clientId), 1);
      convey.roomDao.writeRoom(this);
      return true;
    }

    return false;
  }

  isConnected(clientId) {
    return this.clients.find(sub => sub === clientId) ? true : false;
  }

  addMessage(message) {
    this.messages.push(message.id);
    convey.roomDao.writeRoom(this);
  }

  getClientData() {
    return this.clients.map((clientId) => {
      return convey.clientDao.getClientById(clientId);
    })
  }

  getMessageData() {
    let result = [];

    for(let messageId of this.messages) {
      let message = convey.messageDao.getMessageById(messageId);
      
      //If a message has been deleted, and he room still has a reference of its id, remove the id from the messages list.
      if(message === undefined) {
        this.messages.splice(this.messages.indexOf(messageId), 1);
        convey.roomDao.writeRoom(this);
      } else {
        result.push({...message, user: convey.clientDao.getClientById(message.sender)});
      }
    }

    return result;
  }

  getRoomJson() {
    return {
      id: this.id,
      owner: this.owner,
      name: this.name,
      description: this.description,
      clients: this.getClientData(),
      messages: this.getMessageData()
    }
  }
}