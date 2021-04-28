const path = require('path');
const fs = require('fs');

const Client =  require("../../models/Client/Client");

module.exports = class ClientDao {
  clients = [];

  constructor() {
    this.init();
  }

  init() {
    this.getJSON().forEach((clientData) => {
      this.clients.push(new Client(clientData));
    })
  }

  addClient(client) {
    this.clients.push(client);
    this.writeJSON();
  }

  getClient(userInfo) {
    return this.clients.find(client => client.sub === userInfo.sub);
  }

  getClientById(clientId) {
    console.log("looking for ", clientId)

    for(let client of this.clients) {
      if(client.sub === clientId) {
        console.log("found client ", client)
        return client;
      }
    }

    return undefined;
  }

  getClients(userInfo) {
    return this.clients.filter(client => client.sub === userInfo.sub);
  }

  writeJSON() {
    fs.writeFileSync(path.join(__dirname, 'clientData.json'), JSON.stringify(this.clients));
  }

  getJSON() {
    console.log("writing to file clientDao");
    if(!fs.existsSync(path.join(__dirname, 'clientData.json'))) {
      this.writeJSON();
    }
    
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'clientData.json'), 'utf8'));
  }
}