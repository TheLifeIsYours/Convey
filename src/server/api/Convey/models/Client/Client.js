class Client {
  messages = [];  
  constructor(userInfo) {
    this.sub = userInfo.sub
    this.name = userInfo.name
    this.given_name = userInfo.given_name
    this.family_name = userInfo.family_name
    this.picture = userInfo.picture
    this.email = userInfo.email
    this.email_verified = userInfo.email_verified
    this.locale = userInfo.locale
    this.messages = global?.convey?.messageDao.getMessages(this.sub) || [];
  }
}

module.exports = Client;