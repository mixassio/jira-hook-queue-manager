import getApp from './app';
import config from '../config';

const { port: portServer } = config;
getApp().listen(portServer, () => console.log(`port: ${portServer}`));
