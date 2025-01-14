import { Injectable } from '@angular/core';
import { Convo, ConvoService } from './convo.service';
import { randomDate, randomText } from '../../../app/tools';
import { LlmRequestService } from './llm-request.service';

@Injectable({
  providedIn: 'any',
})
export class ChatService {
  public convoService = new ConvoService();
  public chatList: Chat[] = [];

  public currentChat: Chat | null = null;

  delete(index: number): Chat {
    const help = this.chatList[index];

    const deletedChat = this.chatList.splice(index, 1);

    if (this.currentChat == deletedChat[0]) {
      this.currentChat = null;
    }

    return help;
  }

  createChat(name: string) {
    const chat = new Chat(name, [], new Date(), name);
    this.chatList.push(chat);
    this.currentChat = chat;

    this.sortChat();
  }

  public setCurrentChat(index: number): void {
    if (this.currentChat != this.chatList[index])
      this.llmService.cancelRequest();

    this.currentChat = this.chatList[index];

    console.info('Current Chat: ' + this.currentChat);
  }

  private sortChat(): void {
    this.chatList.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  }

  deleteAll() {
    this.chatList.splice(0, this.chatList.length);
  }

  public isCurrentChat(index: number): boolean {
    return this.chatList[index] == this.currentChat;
  }

  constructor(private llmService: LlmRequestService) {
    for (let index = 0; index < 20; index++) {
      this.chatList.push(this.createNewChat(20, 20));
    }

    // this.currentChat = this.chatList[0];
    console.log(this.chatList.length);

    this.sortChat();

    for (const element in this.chatList) {
      console.log(this.chatList[element]);
    }
  }

  createNewChat(textLength: number, convoLength: number): Chat {
    return new Chat(
      randomText(textLength),
      this.convoService.buildConvo(convoLength),
      randomDate(),
      'tinyllama:latest'
    );
  }
}

export class Chat {
  private nameSet = false;

  constructor(
    public name: string = '',
    public convo: Convo[] = [],
    public date: Date = new Date(),
    public modelName: string = ''
  ) {}

  public addNewConvo(convo: Convo) {
    this.convo.push(convo);

    if (!this.nameSet) {
      this.setName(this.convo[0].content.substring(0, 30));
      this.nameSet = true;
    }
  }

  public setName(newName: string) {
    this.name = newName;
  }

  public printChat(): void {
    console.log(this.name);
  }
}
