import { plainToClass } from 'class-transformer';
import ClientDao from './data/ClientDao/ClientDao'
import MessageDao from './data/MessageDao/MessageDao';
import RoomDao from './data/RoomDao/RoomDao';
import Client from './models/Client/Client'
import UserInfo from './models/Providers/Google/UserInfo';
import Room from './models/Room/Room';

export default new class Convey {
  public messageDao: MessageDao = new MessageDao();
  public clientDao: ClientDao = new ClientDao();
  public roomDao: RoomDao = new RoomDao();

  constructor(){};

  createClient(userInfo: Client): Client {
    const client = new Client(userInfo);
    this.clientDao.addClient(client);
    return client;
  }

  clientExists(userInfo: UserInfo): boolean {
    if(this.clientDao.getClient(userInfo) !== null) return true;
    return false;
  }

  getUniqueRoomId(): string {
    let rndId = require('crypto').randomBytes(32).toString('hex');
    let exists = this.roomDao.rooms.find((room) => room.id === rndId)

    if(exists) {
      return this.getUniqueRoomId();
    }

    return rndId;
  }

  getUniqueMessageId(): string {
    let rndId = require('crypto').randomBytes(32).toString('hex');
    let exists = this.messageDao.messages.find((message) => message.id === rndId);

    if(exists) {
      return this.getUniqueMessageId();
    }

    return rndId;
  }
}