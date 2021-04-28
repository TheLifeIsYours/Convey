const express = require('express');
const router = express.Router()
const fetch = require('node-fetch')

const providers = require('../../data/auth/providers');

router.get('/', (req, res) => {
  if(req.session.isLoggedIn) {
    console.log("is Logged in ", req.session.isLoggedIn)
    if(req.session.userInfo !== undefined) {
      let clientData = convey.clientDao.getClientById(req.session.userInfo.sub)

      if(!clientData) {
        clientData = convey.createClient(req.session.userInfo);
      }
      
      return res.json(clientData);
    }
  }
  
  return res.status(401).send();
})

router.post('/', async (req, res) => {
  const authorization = req.header("Authorization");
  const loginProvider = providers.find((p) => p.name === req.header("X-Login-Provider"))

  if (authorization && loginProvider) {
    let discoveryResponse = await fetch(loginProvider.discovery_url);

    if (!discoveryResponse.ok) {
      console.error(discoveryResponse);
      return res.status(500).send();
    }

    const { userinfo_endpoint } = await discoveryResponse.json();
    const userInfoResponse = await fetch(userinfo_endpoint, {headers: {authorization}});

    if (userInfoResponse.ok) {
      const userInfo = await userInfoResponse.json();
      let clientData = convey.clientDao.getClientById(userInfo.sub)
      
      if(!clientData) {
        clientData = convey.createClient(userInfo);
      }
      
      res.json(clientData);
    } else {
      return res.status(401).send(userInfoResponse);
    }
  }

  res.status(401).send();
})

module.exports = router