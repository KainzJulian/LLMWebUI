import { Injectable } from '@angular/core';
import { Convo, ConvoService } from './convo.service';
import { randomText } from '../../../app/tools';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public convoService = new ConvoService();
  public chatList: Chat[];

  public currentChat!: Chat;

  delete(index: number): Chat {
    const help = this.chatList[index];

    this.chatList.splice(index, 1);
    return help;
  }

  public setCurrentChat(index: number): void {
    this.currentChat = this.chatList[index];
  }

  constructor() {
    this.chatList = [];

    this.chatList.push(
      new Chat(randomText(10), this.convoService.buildConvo(20))
    );
    this.chatList.push(
      new Chat(randomText(10), this.convoService.buildConvo(20))
    );
    this.chatList.push(
      new Chat(randomText(10), this.convoService.buildConvo(20))
    );
    this.chatList.push(
      new Chat(randomText(10), this.convoService.buildConvo(20))
    );
    this.chatList.push(
      new Chat(randomText(10), this.convoService.buildConvo(20))
    );
    this.chatList.push(
      new Chat(randomText(10), this.convoService.buildConvo(20))
    );
    this.chatList.push(
      new Chat(randomText(10), this.convoService.buildConvo(20))
    );

    this.currentChat = this.chatList[0];

    for (const element in this.chatList) {
      console.log(this.chatList[element]);
    }
  }
}

export class Chat {
  constructor(public name: string, public convo: Convo[]) {}

  public delete(): void {}

  public printChat(): void {
    console.log(this.name);
    return;
  }
}
