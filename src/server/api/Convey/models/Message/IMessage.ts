import UserInfo from '../Providers/Google/UserInfo';

export default interface IMessage {
  id: string;
  sender: UserInfo;
  receivers: UserInfo[];
  message: String;
  time: number;
}