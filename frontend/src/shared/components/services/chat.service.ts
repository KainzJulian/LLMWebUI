import { Injectable } from '@angular/core';
import { Chat } from '../../types/chat';
import { ENV } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Convo } from '../../types/convo';

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

    console.log(this.currentChat.id);

    this.currentChat.isFavourite = !this.currentChat.isFavourite;

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

    this.http.post<boolean>(ENV.chatURL + '/' + id + '/switchFavourite', body).subscribe((res) => {
      if (!res) this.currentChat = null;
      console.log(res);
    });
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

    this.sortChat();

    return help;
  }

  createChat(name: string): Chat {
    const chatBody = new Chat('', name, name, [], new Date());

    this.http.post<string>(ENV.chatURL + '/new', chatBody).subscribe((res) => {
      const chat = new Chat(res, name, name, [], new Date());

      this.chatList.push(chat);
      this.currentChat = chat;

      this.sortChat();
    });

    return chatBody;
  }

  public setCurrentChat(chat: Chat): void {
    this.currentChat = this.currentChat?.id == chat.id ? null : chat;

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

    this.http.delete(ENV.chatURL.href).subscribe(() => {
      console.log('Deleted all Chats: ');
    });
  }

  public isCurrentChat(chat: Chat, chatList: Chat[]): boolean {
    return chatList.find((val) => val.id == chat.id) == this.currentChat;
  }

  setChats(): void {
    this.http.get<Chat[]>(ENV.chatURL.href).subscribe((res) => {
      res.forEach((chat) => {
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
    this.http.post<boolean>(ENV.chatURL + '/add/' + id, body).subscribe((res) => {
      console.log('Status of addConvo: ' + res);
    });
  }
}
