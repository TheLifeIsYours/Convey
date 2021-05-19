import express from 'express'
import app from './app'
import https from 'https'
import path from 'path'
import fs from 'fs'

//HTTP Server
const httpServer = express();
httpServer.use('*', express.Router().get('/', (req: express.Request, res: express.Response) => {
  console.log("Connected to http server",  JSON.stringify(req.url))
  res.redirect(`https://localhost:${process.env.PORT_HTTPS}${req.url}`);
}));

httpServer.listen(process.env.PORT_HTTP);
httpServer.on('listening', () => logListening(process.env.PORT_HTTP));

//HTTPS Server
const httpsServer = https.createServer({
    key: fs.readFileSync(path.resolve(__dirname, '../../ssl/localhost.key')) ,
    cert: fs.readFileSync(path.resolve(__dirname, '../../ssl/localhost.crt'))
  }, app);


httpsServer.listen(process.env.PORT_HTTPS);
httpsServer.on('listening', () => logListening(process.env.PORT_HTTPS));

//SocketIO
import { Server } from 'socket.io';
import io from './sockets/base'

io(new Server(httpsServer));

function logListening(port: string|any) {
  console.log(`\x1b[0mServer listening on \x1b[33m${port}\n\x1b[34mhttps://localhost:${port}`)
}
