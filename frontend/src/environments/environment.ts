const baseURL = 'http://127.0.0.1:8000/';
const modelURL = baseURL + 'models';
const chatURL = baseURL + 'chats';
const fileURL = baseURL + 'file';

export const ENV = {
  modelList: new URL(modelURL),
  generateURL: new URL(modelURL + '/generate'),
  chatURL: new URL(chatURL),
  getAllChats: new URL(modelURL + '/chats'),
  updateModels: new URL(modelURL + '/update'),
  fileRoute: new URL(fileURL)
};
