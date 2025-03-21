import { Injectable, signal } from '@angular/core';
import { Chat } from '../../types/chat';

@Injectable({
  providedIn: 'root'
})
export class FloatingInputStateService {
  isFloatingInputOpen = signal(false);
  chat = signal(new Chat());

  constructor() {}

  public getFloatingInputState(): boolean {
    return this.isFloatingInputOpen();
  }

  public setFloatingInputState(state: boolean) {
    this.isFloatingInputOpen.set(state);
  }

  public switchFloatingInputState() {
    this.isFloatingInputOpen.update((current) => !current);
  }

  public setChat(chat: Chat) {
    this.chat.set(chat);
  }
}
