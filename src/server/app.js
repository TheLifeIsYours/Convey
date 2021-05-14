const express = require('express');
const session = require('express-session');

global.convey = require('./api/Convey');

const dotenv = require('dotenv-flow').config({silent: true});
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');
const fs = require('fs');

const app = express();

//Session
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: require('crypto').randomBytes(64).toString('hex'),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '../../build/client')));

//Path router
function setupRoutes(entry) {
  return new Promise(async (resolve) => {
    console.log("\x1b[0mEntry:\x1b[34m", path.join(entry))

    await fs.readdirSync(path.join(__dirname, entry)).forEach(async (route) => {
      
      const hasSubRoute = (route.lastIndexOf('.') <= 0)
      // console.log({hasSubRoute})
  
      if(hasSubRoute) {
        console.log("\x1b[0mEntering new route:\x1b[34m", path.join(entry, route))
  
        setupRoutes(path.join(entry, route))
      } else {
  
        route = path.join(entry, route)
        route = route.substr(0, route.lastIndexOf('.'))
        
        const uri = route.substr(route.indexOf('/'))
  
        console.log(`\x1b[0mApplying route: \x1b[33m[\x1b[34m${uri}\x1b[0m => \x1b[34m./${route}\x1b[33m]`)
        
        app.use(`${uri}`, (await require(`./${route}`)))
      }
    })

    return resolve(true)
  })
}

(async () => {
  await setupRoutes('routes')
  app.use((req, res, next) => req.path.startsWith('/api') ? next() : res.sendFile(path.join(__dirname, '../../build/client/index.html')))
})()

module.exports = app