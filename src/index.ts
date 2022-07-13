import Server from './server/config';
require('dotenv').config();

const server = new Server();

server.start();
