const Queue = require('bull');
const REDIS_URL = process.env.REDIS_URL;

const createRoomQueue = new Queue('create-room-queue', REDIS_URL);

const delay = async(ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

createRoomQueue.process(
    async(job) => {
        job.progress(38);
        console.log("ob.data", job.data);
        return '345';
    },
);

module.exports = {
    createRoomQueue,
};