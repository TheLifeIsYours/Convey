import { atom } from 'recoil'
export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    sub: '',
    name: '',
    given_name: '',
    family_name: '',
    picture: '',
    email: '',
    email_verified: false,
    locale: '',
    messages: []
  }
});