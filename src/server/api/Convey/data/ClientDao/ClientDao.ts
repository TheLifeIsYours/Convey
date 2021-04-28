import { plainToClass } from 'class-transformer';
import path from 'path';
import fs from 'fs';

import Client from "../../models/Client/Client";
import UserInfo from '../../models/Providers/Google/UserInfo';

export default class ClientDao {
  public clients: Client[] = [];

  constructor() {
    this.init();
  }

  init() {
    this.getJSON().forEach((clientData) => {
      this.clients.push(new Client(clientData));
    })
  }

  addClient(client: Client) {
    this.clients.push(client);
    this.writeJSON();
  }

  getClient(userInfo: UserInfo): Client | undefined {
    return this.clients.find(client => client.sub === userInfo.sub);
  }

  getClientById(clientId: string): Client | undefined {
    console.log("looking for ", clientId)

    for(let client of this.clients) {
      if(client.sub === clientId) {
        console.log("found client ", client)
        return client;
      }
    }

    return undefined;
  }

  getClients(userInfo: UserInfo): Client[] {
    return this.clients.filter(client => client.sub === userInfo.sub);
  }

  writeJSON() {
    fs.writeFileSync(path.join(__dirname, 'clientData.json'), JSON.stringify(this.clients));
  }

  getJSON(): UserInfo[] {
    console.log("writing to file clientDao");
    if(!fs.existsSync(path.join(__dirname, 'clientData.json'))) {
      this.writeJSON();
    }
    
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'clientData.json'), 'utf8'));
  }
}