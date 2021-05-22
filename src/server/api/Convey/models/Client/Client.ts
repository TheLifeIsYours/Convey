import UserInfo from "../Providers/Google/UserInfo";
import IClient from "./IClient"
import Message from "../Message/Message";

class Client extends UserInfo implements IClient {
  public display_name: string = "";
  public messages: Message[] = [];

  constructor(userInfo: Client) {
    super(userInfo);
    this.DisplayName = userInfo.display_name || userInfo.name;
    this.messages = global.convey?.messageDao.getMessages(this.sub) || [];
  }
  
  public get DisplayName(): string {
    return this.display_name;
  }
  
  public set DisplayName(value: string) {
    this.display_name = value;
    
    global.convey?.clientDao.writeClient(this);
  }

}

export default Client;