const logger = require('../modules/log.js')(module);
const requestPromise = require('request-promise-native');
const { auth } = require('./utils.js');
const { getRequestErrorLog } = require('./messages');
const TIMEOUT = 60000;
const {
  jira: { url: jiraUrl },
} = require('../../config');

const fileRequest = async (url, newOptions) => {
  const options = {
    url,
    timeout: TIMEOUT,
    encoding: null,
    ...newOptions,
  };
  try {
    const response = await requestPromise.get(options);
    logger.debug(`Get media file by request with url ${url} suceeded`);

    return response;
  } catch (err) {
    throw getRequestErrorLog(url, err.statusCode, options);
  }
};

const request = async (url, newOptions) => {
  const options = {
    method: 'GET',
    headers: { Authorization: auth(), 'content-type': 'application/json' },
    timeout: TIMEOUT,
    ...newOptions,
  };
  try {
    const response = await requestPromise(url, options);
    logger.debug(`${options.method} request to jira with Url ${url} suceeded`);
    if (['GET', 'POST', 'PUT'].includes(options.method) && url !== jiraUrl && response) {
      return JSON.parse(response);
    }
  } catch ({ statusCode }) {
    throw getRequestErrorLog(url, statusCode, options);
  }
};

const requestPost = (url, body) => {
  const options = {
    method: 'POST',
    body,
  };

  return request(url, options);
};

const requestPut = (url, body) => {
  const options = {
    method: 'PUT',
    body,
  };

  return request(url, options);
};

module.exports = {
  fileRequest,
  request,
  requestPost,
  requestPut,
};
