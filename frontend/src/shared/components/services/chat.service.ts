import { Injectable } from '@angular/core';
import { Chat } from '../../types/chat';
import { ENV } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Convo } from '../../types/convo';
import { BackendResponse } from '../../types/response';
import { FloatingInputStateService } from './floating-input-state.service';
import { FileUploaderService } from './file-uploader.service';

@Injectable({
  providedIn: 'any'
})
export class ChatService {
  public chatList: Chat[] = [];
  public favouriteChats: Chat[] = [];

  public currentChat: Chat | null = null;

  constructor(
    private http: HttpClient,
    private floatingInputService: FloatingInputStateService,
    private fileUploaderService: FileUploaderService
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

    this.http.post<boolean>(ENV.chatSwitchFavouriteRoute(id).href, body).subscribe((res) => {
      if (!res) this.currentChat = null;
    });
  }

  delete(id: string): Chat {
    const index = this.getChatList().findIndex((val) => val.id == id);

    this.http.delete<boolean>(ENV.chatRemoveRoute(id).href).subscribe((res) => {
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
    const chatBody = new Chat('', name, name, [], new Date(), false, false, []);

    this.http
      .post<BackendResponse<string>>(ENV.chatCreateNewRoute.href, chatBody)
      .subscribe((res) => {
        if (res.data == null) return;

        const chat = new Chat(res.data, name, name, [], new Date());

        this.chatList.push(chat);
        this.currentChat = chat;

        this.sortChat();
      });

    return chatBody;
  }

  public setCurrentChat(chat: Chat | null): void {
    if (this.currentChat?.id == chat?.id) return;

    this.fileUploaderService.abort();
    this.currentChat = chat;
  }

  private sortChat(): void {
    this.chatList.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  }

  deleteAll() {
    this.setCurrentChat(null);

    this.chatList = this.chatList.filter((val) => val.isArchived);
    this.favouriteChats = [];

    this.http.delete<BackendResponse<boolean>>(ENV.fileRemoveRoute.href).subscribe((res) => {
      console.log(res);
    });
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

    this.http
      .post<BackendResponse<boolean>>(ENV.chatAddConvoRoute(id).href, body)
      .subscribe((res) => {
        console.log(res);
      });
  }

  archive(id: string) {
    this.setCurrentChat(null);

    this.http
      .post<BackendResponse<Chat[]>>(ENV.chatArchiveRoute(id).href, null)
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

    const url = ENV.chatRenameRoute(chat.id);
    url.searchParams.set('name', input);

    this.http.post<BackendResponse<boolean>>(url.href, input).subscribe((res) => console.log(res));
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
      .post<BackendResponse<Chat[]>>(ENV.chatDearchiveRoute(id).href, null)
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
