import Client from '../Client/Client';

export default class Message {
  public id?: string;
  public room?: string;
  public sender?: string;
  public text?: string;
  public time?: number;

  constructor(messageData?: Message) {
    this.id = messageData?.id || global?.convey?.getUniqueMessageId();
    this.room = messageData?.room;
    this.sender = messageData?.sender;
    this.text = messageData?.text;
    this.time = messageData?.time;
  }

  getRoom(): string {
    return this.room!!;
  }

  getSender(): string {
    return this.sender!!;
  }

  getText(): string {
    return this.text!!;
  }

  getTime(): number {
    return this.time!!;
  }
}