export default class UserInfo implements IUserInfo {
  
  public sub: string
  public name: string
  public given_name: string
  public family_name: string
  public picture: string
  public email: string
  public email_verified: boolean
  public locale: string

  constructor(userInfo: UserInfo) {
    this.sub = userInfo.sub
    this.name = userInfo.name
    this.given_name = userInfo.given_name
    this.family_name = userInfo.family_name
    this.picture = userInfo.picture
    this.email = userInfo.email
    this.email_verified = userInfo.email_verified
    this.locale = userInfo.locale
  }
}