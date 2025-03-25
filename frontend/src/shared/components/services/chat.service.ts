import { Injectable } from '@angular/core';
import { Chat } from '../../types/chat';
import { ENV } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Convo } from '../../types/convo';
import { BackendResponse } from '../../types/response';
import { FloatingInputStateService } from './floating-input-state.service';

@Injectable({
  providedIn: 'any'
})
export class ChatService {
  public chatList: Chat[] = [];
  public favouriteChats: Chat[] = [];

  public currentChat: Chat | null = null;

  constructor(
    private http: HttpClient,
    private floatingInputService: FloatingInputStateService
  ) {
    this.setChats();
  }

  getArchivedChats(): Chat[] {
    return this.chatList.filter((val) => val.isArchived);
  }

  getChatList(): Chat[] {
    return this.chatList.filter((val) => !val.isArchived);
  }

  switchFavouriteState() {
    if (this.currentChat == null) return;

    this.currentChat.isFavourite = !this.currentChat.isFavourite;

    const chatListIndex = this.getChatList().findIndex((val) => val.id == this.currentChat?.id);
    console.log(this.getChatList()[chatListIndex]);

    this.getChatList()[chatListIndex].isFavourite = this.currentChat.isFavourite;

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

  delete(id: string): Chat {
    const index = this.getChatList().findIndex((val) => val.id == id);

    const url = ENV.chatURL.href + '/remove/' + id;

    this.http.delete<boolean>(url).subscribe((res) => {
      console.log(res);
    });

    const deletedChat = this.chatList.splice(index, 1);

    if (deletedChat[0].isFavourite) {
      const favouriteIndex = this.favouriteChats.findIndex((val) => val.id == id);
      this.favouriteChats.splice(favouriteIndex, 1);
    }

    if (this.currentChat == deletedChat[0]) {
      this.currentChat = null;
    }

    this.sortChat();

    return deletedChat[0];
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

  public setCurrentChat(chat: Chat | null): void {
    this.currentChat = chat;
  }

  private sortChat(): void {
    this.chatList.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  }

  deleteAll() {
    this.chatList.splice(0, this.getChatList().length);
    this.currentChat = null;

    this.http.delete<BackendResponse<boolean>>(ENV.chatURL.href);
  }

  public isCurrentChat(chat: Chat, chatList: Chat[]): boolean {
    return chatList.find((val) => val.id == chat.id) == this.currentChat;
  }

  setChats(): void {
    this.http.get<BackendResponse<Chat[]>>(ENV.chatURL.href).subscribe((res) => {
      if (res.data == null) return;
      console.log(res.data);

      res.data.forEach((chat) => {
        if (chat.isFavourite) this.favouriteChats.push(chat);

        this.chatList.push(
          new Chat(
            chat.id,
            chat.modelName,
            chat.name,
            chat.convo,
            new Date(chat.date),
            chat.isFavourite,
            chat.isArchived
          )
        );
      });

      this.sortChat();
    });
  }

  public addConvo(convo: Convo, id: string) {
    const body = convo;
    this.http.post<BackendResponse<boolean>>(ENV.chatURL + '/add/' + id, body).subscribe((res) => {
      console.log(res);
    });
  }

  archive(id: string) {
    this.setCurrentChat(null);

    this.http
      .post<BackendResponse<Chat[]>>(ENV.chatURL.href + '/archive/' + id, null)
      .subscribe((res) => {
        this.getChatList()
          .find((val) => val.id == id)
          ?.archive();

        const index = this.favouriteChats.findIndex((val) => val.id == id);
        if (index != -1) this.favouriteChats.splice(index, 1);

        console.log(res);
      });
  }

  rename(input: string) {
    const chat = this.floatingInputService.chat();

    const path = new URL(ENV.chatURL.href + '/rename/' + chat.id);
    path.searchParams.set('name', input);

    this.http.post<BackendResponse<boolean>>(path.href, input).subscribe((res) => console.log(res));
  }

  download(chat: Chat, fileName: string) {
    const blob = new Blob([JSON.stringify(chat.convo, null, 2)], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName + '.json';
    link.click();
    window.URL.revokeObjectURL(link.href);
  }

  dearchive(id: string) {
    this.setCurrentChat(null);

    this.http
      .post<BackendResponse<Chat[]>>(ENV.chatURL.href + '/dearchive/' + id, null)
      .subscribe((res) => {
        console.log(res);

        const chat = this.getArchivedChats().find((val) => val.id == id);

        this.getArchivedChats()
          .find((val) => val.id == id)
          ?.dearchive();

        if (chat?.isFavourite)
          this.favouriteChats.push(
            new Chat(
              chat.id,
              chat.modelName,
              chat.name,
              chat.convo,
              chat.date,
              chat.isFavourite,
              chat.isArchived
            )
          );
      });
  }
}
