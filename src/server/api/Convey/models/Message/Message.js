module.exports = class Message {
  constructor(messageData) {
    this.id = messageData?.id || global?.convey?.getUniqueMessageId();
    this.room = messageData?.room;
    this.sender = messageData?.sender;
    this.text = messageData?.text;
    this.time = messageData?.time;
  }

  getRoom() {
    return this.room;
  }

  getSender() {
    return this.sender;
  }

  getText() {
    return this.text;
  }

  getTime() {
    return this.time;
  }
}