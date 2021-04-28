import express from 'express';
const router = express.Router();

import bcrypt from 'bcrypt';
import Client from '../../api/Convey/models/Client/Client';
import UserInfo from '../../api/Convey/models/Providers/Google/UserInfo';

router.post('/', async (req, res) => {

  const {given_name, family_name, email, password} = req.body

  const existingUser = convey.clientDao.clients.find((client) => client.email === email)
  if(existingUser) {
    res.status(403).send("User by that email already exists");
    return;
  }

  if(password !== undefined){
    let hashedPass = await bcrypt.hash(password, 15);
  
    const userInfo: UserInfo = {sub: hashedPass, name: `${given_name} ${family_name}`, given_name, family_name, picture: "", email, email_verified: false, locale: "en"}
  
    const client = new Client(userInfo);
    convey.clientDao.addClient(client);
    
    req.session.isLoggedIn = true;
    req.session.userInfo = userInfo;
  
    return res.status(200).send("Signed up successfully");
  }

  res.status(403).send("Something went wrong");
})

export default router;