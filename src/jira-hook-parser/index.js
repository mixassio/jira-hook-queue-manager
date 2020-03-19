const { usersToIgnore, testMode } = require('../../config');
const logger = require('../modules/log.js')(module);
const { getFuncAndBody } = require('./bot-handler.js');
const isIgnore = require('./is-ignore');
const { createRoomQueue } = require('../queues');



/**
 * Is ignore data
 * @async
 * @param {object} body hook body
 * @param {string[]} _usersToIgnore users to ignore
 * @param {{on: boolean, users: string[]}} _testMode test mode data
 * @return {boolean} ignore or not
 */
module.exports = async (body, _usersToIgnore = usersToIgnore, _testMode = testMode) => {
  try {
    console.log('start isIgnore');
    const ignoredUsers = [..._usersToIgnore, ...testMode.users];
    const mode = _testMode.on;
    if (await isIgnore(body, ignoredUsers, mode)) {
      return;
    }
    console.log('finish isIgnore');

    const parsedBody = getFuncAndBody(body);
    console.log('parsedBody----->', parsedBody);
    const {createRoomData} = parsedBody.find(({redisKey, }) => redisKey === 'newrooms')
    console.log("createRoom", createRoomData);
    const res = await createRoomQueue.add({ data: parsedBody });
    console.log("res", res)
    // const handledKeys = (await Promise.all(parsedBody.map(saveIncoming))).filter(Boolean);

    // await saveToHandled(handledKeys);

    return true;
  } catch (err) {
    logger.error('Error in parsing ', err);

    return false;
  }
};
