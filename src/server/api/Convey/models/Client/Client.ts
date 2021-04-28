import UserInfo from "../Providers/Google/UserInfo";
import IClient from "./IClient"
import Message from "../Message/Message";

class Client extends UserInfo implements IClient {
  public messages: Message[] = [];

  constructor(userInfo: UserInfo) {
    super(userInfo);
    this.messages = global?.convey?.messageDao.getMessages(this.sub) || [];
  }
  
}

export default Client;