import { Injectable } from '@angular/core';
import { Chat } from '../../types/chat';
import { ENV } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Convo } from '../../types/convo';
import { BackendResponse } from '../../types/response';

@Injectable({
  providedIn: 'any'
})
export class ChatService {
  public chatList: Chat[] = [];
  public favouriteChats: Chat[] = [];

  public currentChat: Chat | null = null;

  constructor(private http: HttpClient) {
    this.setChats();
  }

  switchFavouriteState() {
    if (this.currentChat == null) return;

    this.currentChat.isFavourite = !this.currentChat.isFavourite;

    const chatListIndex = this.chatList.findIndex((val) => val.id == this.currentChat?.id);
    console.log(this.chatList[chatListIndex]);

    this.chatList[chatListIndex].isFavourite = this.currentChat.isFavourite;

    const body = this.currentChat;
    const id = this.currentChat.id;
    const index = this.favouriteChats.findIndex((val) => val.id == id);

    const newChat = new Chat(
      this.currentChat.id,
      this.currentChat.modelName,
      this.currentChat.name,
      this.currentChat.convo,
      this.currentChat.date,
      this.currentChat.isFavourite
    );

    if (this.currentChat.isFavourite) this.favouriteChats.push(newChat);
    else {
      this.currentChat = null;
      this.favouriteChats.splice(index, 1);
    }

    this.http.post<boolean>(ENV.chatURL + '/switchFavourite/' + id, body).subscribe((res) => {
      if (!res) this.currentChat = null;
    });
  }

  delete(index: number): Chat {
    const help = this.chatList[index];
    const modelID = this.chatList[index].id;

    const url = ENV.chatURL.href + '/remove/' + modelID;

    this.http.delete<boolean>(url).subscribe((res) => {
      console.log(res);
    });

    const deletedChat = this.chatList.splice(index, 1);

    if (deletedChat[0].isFavourite) {
      const favouriteIndex = this.favouriteChats.findIndex((val) => val.id == modelID);
      this.favouriteChats.splice(favouriteIndex, 1);
    }

    if (this.currentChat == deletedChat[0]) {
      this.currentChat = null;
    }

    this.sortChat();

    return help;
  }

  createChat(name: string): Chat {
    const chatBody = new Chat('', name, name, [], new Date());

    this.http.post<BackendResponse<string>>(ENV.chatURL + '/new', chatBody).subscribe((res) => {
      if (res.data == null) return;

      const chat = new Chat(res.data, name, name, [], new Date());

      this.chatList.push(chat);
      this.currentChat = chat;

      this.sortChat();
    });

    return chatBody;
  }

  public setCurrentChat(chat: Chat): void {
    this.currentChat = chat;

    console.info('Current Chat: ' + this.currentChat);
    console.info('Current Chat: ' + this.currentChat?.isFavourite);
  }

  private sortChat(): void {
    this.chatList.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  }

  deleteAll() {
    this.chatList.splice(0, this.chatList.length);
    this.currentChat = null;

    this.http.delete<BackendResponse<boolean>>(ENV.chatURL.href);
  }

  public isCurrentChat(chat: Chat, chatList: Chat[]): boolean {
    return chatList.find((val) => val.id == chat.id) == this.currentChat;
  }

  setChats(): void {
    this.http.get<BackendResponse<Chat[]>>(ENV.chatURL.href).subscribe((res) => {
      if (res.data == null) return;

      res.data.forEach((chat) => {
        if (chat.isFavourite) this.favouriteChats.push(chat);

        this.chatList.push(
          new Chat(
            chat.id,
            chat.modelName,
            chat.name,
            chat.convo,
            new Date(chat.date),
            chat.isFavourite
          )
        );
      });

      this.sortChat();
    });
  }

  public addConvo(convo: Convo, id: string) {
    const body = convo;
    this.http.post<BackendResponse<boolean>>(ENV.chatURL + '/add/' + id, body);
  }
}
