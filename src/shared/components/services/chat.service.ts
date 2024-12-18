import { Injectable } from '@angular/core';
import { ConvoList, ConvoService } from './convo.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public convoService = new ConvoService();
  public chatList: ChatList;

  constructor() {
    this.chatList = new ChatList([
      new Chat('test', this.convoService.convoListBuilder()),
      new Chat('oo', this.convoService.convoListBuilder()),
      new Chat('buad', this.convoService.convoListBuilder()),
      new Chat('tesadsft', this.convoService.convoListBuilder()),
      new Chat('tesvadft', this.convoService.convoListBuilder()),
      new Chat('tesaxcvt', this.convoService.convoListBuilder()),
      new Chat('tesasdft', this.convoService.convoListBuilder()),
    ]);

    for (const element in this.chatList.chat) {
      console.log(this.chatList.chat[element]);
    }
  }
}

export class Chat {
  constructor(public name: string, public convoList: ConvoList) {}
}

export class ChatList {
  constructor(public chat: Chat[]) {}
}
