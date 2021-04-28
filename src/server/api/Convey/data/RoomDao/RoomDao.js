const path = require('path');
const fs = require('fs');

const Room =  require("../../models/Room/Room");

module.exports = class RoomDao {
  rooms = [];

  constructor() {
    this.init();
  }

  init() {
    this.getJSON().forEach((roomData) => {
      this.rooms.push(new Room(roomData));
    })
  }
  
  createRoom(roomInfo) {
    let room = new Room(roomInfo);
    console.log(room);
    this.rooms.push(room);
    console.log(JSON.stringify(this.rooms))
    this.writeJSON();
    return room;
  }

  getRooms() {
    return this.rooms.filter(room => room.id !== null);
  }

  getRoomById(id) {
    return this.rooms.find(room => room.id === id);
  }

  writeRoom(_room) {
    let existingRoom = this.rooms.findIndex(room => room.id === _room.id);

    if(existingRoom) {
      this.rooms[existingRoom] = _room;
    }

    this.writeJSON();
  }

  writeJSON() {
    console.log("writing to file roomDao");
    fs.writeFileSync(path.join(__dirname, 'roomData.json'), JSON.stringify(this.rooms));
  }

  getJSON() {
    console.log("writing to file roomDao");
    if(!fs.existsSync(path.join(__dirname, 'roomData.json'))) {
      this.writeJSON();
    }
    
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'roomData.json'), 'utf8'));
  }
}