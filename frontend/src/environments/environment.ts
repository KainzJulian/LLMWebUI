const baseURL = 'http://127.0.0.1:8000/';
const modelURL = baseURL + 'models';
const chatURL = baseURL + 'chats';
const fileURL = baseURL + 'chats';

export const ENV = {
  modelList: new URL(modelURL),
  generateURL: new URL(modelURL + '/generate'),
  chatURL: new URL(chatURL),
  getAllChats: new URL(modelURL + '/chats'),
  updateModels: new URL(modelURL + '/update'),
  fileRoute: new URL(chatURL),
  fileRemoveRoute: new URL(chatURL + '/remove'),
  chatCreateNewRoute: new URL(chatURL + '/new'),
  chatSwitchFavouriteRoute: (chatID: string) =>
    new URL(chatURL + '/' + chatID + '/switch-favourite'),
  chatRemoveRoute: (chatID: string) => new URL(chatURL + '/' + chatID + '/remove'),
  chatAddConvoRoute: (chatID: string) => new URL(chatURL + '/' + chatID + '/add'),
  chatArchiveRoute: (chatID: string) => new URL(chatURL + '/' + chatID + '/archive'),
  chatDearchiveRoute: (chatID: string) => new URL(chatURL + '/' + chatID + '/dearchive'),
  chatRenameRoute: (chatID: string) => new URL(chatURL + '/' + chatID + '/rename'),
  fileUploaderRoute: (chatID: string) => new URL(fileURL + '/' + chatID + '/upload'),
  fileDeleteRoute: (chatID: string) => new URL(fileURL + '/' + chatID + '/delete'),
  fileSetDataRoute: (chatID: string) => new URL(fileURL + '/' + chatID + '/files')
};
