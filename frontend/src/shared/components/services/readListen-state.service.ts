import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReadListenStateService {
  private shouldRead = signal(false);
  private shouldListen = signal(false);

  public getReadState() {
    return this.shouldRead();
  }

  public getListenState() {
    return this.shouldListen();
  }

  public setListenState(state: boolean) {
    this.shouldListen.set(state);
  }

  public setReadState(state: boolean) {
    this.shouldRead.set(state);
  }

  public switchReadState() {
    this.shouldRead.update((current) => !current);
  }

  public switchListenState() {
    this.shouldListen.update((current) => !current);
  }
}
