import express from 'express';
import session from 'express-session';
import Convey from './api/Convey';

const dotenv = require('dotenv-flow').config({silent: true});
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const fs = require('fs');

const app = express();

declare global {
  var convey: typeof Convey;
}
global.convey = Convey;

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(express.static(path.join(__dirname, '../../build/client')));

//Path router
function setupRoutes(entry: string) {
  return new Promise(async (resolve) => {
    console.log("\x1b[0mEntry:\x1b[34m", path.join(entry))

    await fs.readdirSync(path.join(__dirname, entry)).forEach(async (route: string) => {
      
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
        
        app.use(`${uri}`, (await import(`./${route}`)).default)
      }
    })

    return resolve(true)
  })
}

(async () => {
  await setupRoutes('routes')
  app.use((req, res, next) => req.path.startsWith('/api') ? next() : res.sendFile(path.join(__dirname, '../../build/client/index.html')))
})()

export default app