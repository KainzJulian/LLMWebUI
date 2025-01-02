import { Injectable } from '@angular/core';
import { Convo, ConvoService } from './convo.service';
import { randomDate, randomText } from '../../../app/tools';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public convoService = new ConvoService();
  public chatList: Chat[] = [];

  public currentChat!: Chat;

  delete(index: number): Chat {
    const help = this.chatList[index];

    this.chatList.splice(index, 1);
    this.currentChat = this.chatList[index];

    return help;
  }

  createChat(name: string) {
    const chat = new Chat(name, [], new Date(), name);
    this.chatList.push(chat);
    this.currentChat = chat;

    this.sortChat();
  }

  public setCurrentChat(index: number): void {
    this.currentChat = this.chatList[index];

    console.info('Current Chat: ' + this.currentChat.date);
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

  constructor() {
    this.chatList.push(
      new Chat(
        randomText(10),
        this.convoService.buildConvo(20),
        randomDate(),
        ''
      )
    );
    this.chatList.push(
      new Chat(
        randomText(10),
        this.convoService.buildConvo(20),
        randomDate(),
        'tinyllama:latest'
      )
    );
    this.chatList.push(
      new Chat(
        randomText(10),
        this.convoService.buildConvo(20),
        randomDate(),
        'tinyllama:latest'
      )
    );
    this.chatList.push(
      new Chat(
        randomText(10),
        this.convoService.buildConvo(20),
        randomDate(),
        'tinyllama:latest'
      )
    );
    this.chatList.push(
      new Chat(
        randomText(10),
        this.convoService.buildConvo(20),
        randomDate(),
        'tinyllama:latest'
      )
    );
    this.chatList.push(
      new Chat(
        randomText(10),
        this.convoService.buildConvo(20),
        randomDate(),
        'tinyllama:latest'
      )
    );
    this.chatList.push(
      new Chat(
        randomText(10),
        this.convoService.buildConvo(20),
        randomDate(),
        'tinyllama:latest'
      )
    );

    // this.currentChat = this.chatList[0];
    console.log(this.chatList.length);

    this.sortChat();

    for (const element in this.chatList) {
      console.log(this.chatList[element]);
    }
  }
}

export class Chat {
  constructor(
    public name: string = '',
    public convo: Convo[] = [],
    public date: Date = new Date(),
    public modelName: string = ''
  ) {}

  public addNewConvo(convo: Convo) {
    this.convo.push(convo);
  }

  public printChat(): void {
    console.log(this.name);
    return;
  }

  public isUndefined(): boolean {
    return this.name == '';
  }
}
