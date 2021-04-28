const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const Client =  require('../../api/Convey/models/Client/Client');
router.post('/', async (req, res) => {

  const {given_name, family_name, email, password} = req.body

  const existingUser = convey.clientDao.clients.find((client) => client.email === email)
  if(existingUser) {
    res.status(403).send("User by that email already exists");
    return;
  }

  if(password !== undefined){
    let hashedPass = await bcrypt.hash(password, 15);
  
    const userInfo = {sub: hashedPass, name: `${given_name} ${family_name}`, given_name, family_name, picture: "", email, email_verified: false, locale: "en"}
  
    const client = new Client(userInfo);
    convey.clientDao.addClient(client);
    
    req.session.isLoggedIn = true;
    req.session.userInfo = userInfo;
  
    return res.status(200).send("Signed up successfully");
  }

  res.status(403).send("Something went wrong");
})

module.exports = router;