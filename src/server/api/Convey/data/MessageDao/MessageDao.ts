import { plainToClass } from 'class-transformer';
import path from 'path';
import fs from 'fs';

import Message from '../../models/Message/Message'

export default class MessageDAO {
  public messages: Message[] = [];

  constructor() {
    this.init();
  }

  init() {
    this.getJSON().forEach((messageData) => {
      this.messages.push(new Message(messageData));
    })
  }

  getMessages(clientId: string): Message[] {
    return this.messages.filter(message => message.sender === clientId);
  }

  getMessageById(messageId: string): Message {
    return this.messages.find(message => message.id === messageId)!!
  }

  writeMessage(message: Message) {
    console.log("Writing message::::", message);
    this.messages.push(message);
    this.writeJSON();
  }

  createMessage(messageData: Message): Message {
    console.log("Creating message::::", messageData);
    let message = new Message(messageData);
    this.writeMessage(message);
    return message;
  }

  writeJSON() {
    console.log("writing to file messageData", JSON.stringify(this.messages));
    fs.writeFileSync(path.join(__dirname, 'messageData.json'), JSON.stringify(this.messages));
  }

  getJSON(): Message[] {
    console.log("writing to file messageDao");
    if(!fs.existsSync(path.join(__dirname, 'messageData.json'))) {
      this.writeJSON();
    }

    return JSON.parse(fs.readFileSync(path.join(__dirname, 'messageData.json'), 'utf8'));
  }
}