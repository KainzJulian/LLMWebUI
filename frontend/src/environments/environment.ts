const baseURL = 'http://127.0.0.1:8000/';
const modelURL = baseURL + 'models';

export const ENV = {
  modelList: new URL(modelURL),
  generateURL: new URL(modelURL + '/generate'),
  chatURL: new URL(baseURL + 'chats')
};

export const METHOD = {
  get: 'GET',
  post: 'POST'
};
