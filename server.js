const express = require('express');
const hubsRouter = require('./hubs/hubs-router');
const server = express();

server.use(express.json());
server.use(hubsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h1> Sals Hubs API</h1>
    `);
});

module.exports = server;
