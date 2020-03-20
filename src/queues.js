const Queue = require('bull');
const { REDIS_URL } = process.env;

const createRoomQueue = new Queue('create-room-queue', REDIS_URL);

const delay = async ms => new Promise(resolve => setTimeout(resolve, ms));

createRoomQueue.process(async job => {
  await delay(30000);
  job.progress(38);
  console.log('job', job);
  return Promise.resolve('345');
});

module.exports = {
  createRoomQueue,
};
