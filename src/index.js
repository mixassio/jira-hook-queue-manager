const getApp = require('./app');
const config = require('../config');

const { port: portServer } = config;
getApp().listen(portServer, () => console.log(`port: ${portServer}`));
