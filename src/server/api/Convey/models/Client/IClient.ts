import Message from "../Message/Message";

export default interface IClient {
  display_name: string;
  messages: Message[];
}