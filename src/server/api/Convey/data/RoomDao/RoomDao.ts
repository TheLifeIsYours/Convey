import { plainToClass } from 'class-transformer';
import path from 'path';
import fs from 'fs';

import Room from "../../models/Room/Room";

export default class RoomDao {
  public rooms: Room[] = [];

  constructor() {
    this.init();
  }

  init() {
    this.getJSON().forEach((roomData) => {
      this.rooms.push(new Room(roomData));
    })
  }
  
  createRoom(roomInfo: Room): Room {
    let room = new Room(roomInfo);
    console.log(room);
    this.rooms.push(room);
    console.log(JSON.stringify(this.rooms))
    this.writeJSON();
    return room;
  }

  getRooms(): Room[] {
    return this.rooms.filter(room => room.id !== null);
  }

  getRoomById(id: string): Room | undefined {
    return this.rooms.find(room => room.id === id);
  }

  writeRoom(_room: Room): void {
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

  getJSON(): Room[] {
    console.log("writing to file roomDao");
    if(!fs.existsSync(path.join(__dirname, 'roomData.json'))) {
      this.writeJSON();
    }
    
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'roomData.json'), 'utf8'));
  }
}