import express from 'express';
const router = express.Router();

import bcrypt from 'bcrypt';
import UserInfo from '../../api/Convey/models/Providers/Google/UserInfo';

router.post('/', async (req, res, next) => {
  console.log(req.body);
  const {email, password} = req.body;

  const client = convey.clientDao.clients.find(client => client.email === email);

  if(client) {
    const passwordMatch = await bcrypt.compare(password, client.sub);

    if(passwordMatch) {
      req.session.isLoggedIn = true;
      req.session.userInfo = client;

      return res.status(200).redirect('/profile')
    }
  }

  res.status(400).send("Username or password incorrect");
});

export default router;

declare module 'express-session' {
  interface SessionData {
    isLoggedIn: boolean
    userInfo: UserInfo
  }
}