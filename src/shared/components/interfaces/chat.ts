import {
  convoListBuilder,
  ConvoList,
} from '../molecules/convo-list/convo-list.component';

export type Chat = {
  name: string;
  convoList: ConvoList;
};

export type ChatList = Chat[];

export const chatListBuilder = (): ChatList => {
  return [
    {
      name: 'test',
      convoList: convoListBuilder(),
    },
    {
      name: 'lol',
      convoList: convoListBuilder(),
    },
    {
      name: 'nixe',
      convoList: convoListBuilder(),
    },
    {
      name: 'fun',
      convoList: convoListBuilder(),
    },
  ];
};
