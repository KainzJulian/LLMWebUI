import { Injectable, model } from '@angular/core';
import { ConvoService } from './convo.service';
import { randomDate, randomText } from '../../../app/tools';
import { LLMRequestService } from './llm-request.service';
import { Chat } from '../../types/chat';
import { ENV, METHOD } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Convo } from '../../types/convo';

@Injectable({
  providedIn: 'any',
})
export class ChatService {
  public convoService = new ConvoService();
  public chatList: Chat[] = [];

  public currentChat: Chat | null = null;

  constructor(private http: HttpClient) {
    this.setChats();

    // this.currentChat = this.chatList[0];
    console.log(this.chatList.length);

    // this.sortChat();

    for (const element in this.chatList) {
      console.log(this.chatList[element]);
    }
  }

  delete(index: number): Chat {
    const help = this.chatList[index];
    const modelID = this.chatList[index].id;
    const url = ENV.chatURL + '/' + modelID;

    console.log(this.chatList);

    this.http.delete<boolean>(url).subscribe((res) => {
      console.log('Deleted chat ' + modelID);
      console.log('Status: ' + res);
    });

    const deletedChat = this.chatList.splice(index, 1);

    if (this.currentChat == deletedChat[0]) {
      this.currentChat = null;
    }

    return help;
  }

  createChat(name: string) {
    const chatBody = new Chat('', name, name, [], new Date());

    this.http.post<string>(ENV.chatURL + '/new', chatBody).subscribe((res) => {
      const chat = new Chat(res, name, name, [], new Date());

      this.chatList.push(chat);
      this.currentChat = chat;

      // this.sortChat();
    });
  }

  getCurrentChat(): Chat | null {
    for (let i = 0; i < this.chatList.length; i++) {
      if (this.isCurrentChat(i)) return this.chatList[i];
    }

    return null;
  }

  public setCurrentChat(index: number): void {
    // if (this.currentChat != this.chatList[index])
    //   this.llmService.cancelRequest();
    this.currentChat = this.chatList[index];
    console.info('Current Chat: ' + this.currentChat);
  }

  // private sortChat(): void {
  //   this.chatList.sort((a, b) => {
  //     return b.date.getTime() - a.date.getTime();
  //   });
  // }

  deleteAll() {
    this.chatList.splice(0, this.chatList.length);
  }

  public isCurrentChat(index: number): boolean {
    return this.chatList[index] == this.currentChat;
  }

  setChats(): void {
    this.http.get<Chat[]>(ENV.chatURL.href).subscribe((res) => {
      console.log(res);

      res.forEach((chat) => {
        this.chatList.push(
          new Chat(chat.id, chat.modelName, chat.name, chat.convo, chat.date)
        );
      });
    });
  }

  public addConvo(convo: Convo, id: string) {
    const body = convo;
    this.http
      .post<boolean>(ENV.chatURL + '/add/' + id, body)
      .subscribe((res) => {
        console.log('Status of addConvo: ' + res);
      });
  }

  // createNewChat(textLength: number, convoLength: number): Chat {
  //   return new Chat(
  //     randomText(textLength),
  //     this.convoService.buildConvo(convoLength),
  //     randomDate(),
  //     'tinyllama:latest'
  //   );
  // }
}
