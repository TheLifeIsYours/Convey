const path = require('path');
const fs = require('fs');

const Message = require('../../models/Message/Message');

module.exports = class MessageDAO {
  messages = [];

  constructor() {
    this.init();
  }

  init() {
    this.getJSON().forEach((messageData) => {
      this.messages.push(new Message(messageData));
    })
  }

  getMessages(clientId) {
    return this.messages.filter(message => message.sender === clientId);
  }

  getMessageById(messageId) {
    return this.messages.find(message => message.id === messageId)
  }

  writeMessage(message) {
    console.log("Writing message::::", message);
    this.messages.push(message);
    this.writeJSON();
  }

  createMessage(messageData) {
    console.log("Creating message::::", messageData);
    let message = new Message(messageData);
    this.writeMessage(message);
    return message;
  }

  writeJSON() {
    console.log("writing to file messageData", JSON.stringify(this.messages));
    fs.writeFileSync(path.join(__dirname, 'messageData.json'), JSON.stringify(this.messages));
  }

  getJSON() {
    console.log("writing to file messageDao");
    if(!fs.existsSync(path.join(__dirname, 'messageData.json'))) {
      this.writeJSON();
    }

    return JSON.parse(fs.readFileSync(path.join(__dirname, 'messageData.json'), 'utf8'));
  }
}