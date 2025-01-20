import { Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV } from '../../../environments/environment';
import { Subscription, tap } from 'rxjs';
import { Chat } from '../../types/chat';
import { Convo, ConvoResponse } from '../../types/convo';

//TODO: alle Subscriptions in ein service geben und funktionen dort verwenden
@Injectable({
  providedIn: 'root',
})
export class LLMRequestService implements OnDestroy {
  private sub: Subscription | null = null;
  public isProcessingRequest = signal(false);

  constructor(private http: HttpClient) {}

  public cancelRequest() {
    console.warn('Canceled Request');
    this.isProcessingRequest.set(false);
    this.sub?.unsubscribe();
  }

  public sendRequest(
    currentChat: Chat | null,
    text: string = '',
    hasSessionMemory: boolean = true,
    onResolve: Function = Function
  ): boolean {
    console.log('current Chat:' + currentChat);
    console.log('processing: ' + this.isProcessingRequest());

    if (currentChat == null || this.isProcessingRequest()) return false;

    const model = currentChat.modelName;
    const newConvo = new Convo({ role: 'user', content: text });

    currentChat.addNewConvo(newConvo);

    let convo: Convo[] = [];
    if (hasSessionMemory) convo = currentChat.convo;
    else convo.push(newConvo);

    console.log(convo);

    const body = `{"model": "${
      currentChat.modelName
    }", "messages": ${JSON.stringify(convo)}, "stream": false}`;

    this.isProcessingRequest.set(true);
    this.sub = this.http
      .post<ConvoResponse>(ENV.generateURL, body)
      .subscribe((resolve) => {
        this.sub?.unsubscribe();
        currentChat?.addNewConvo(new Convo(resolve.response));
        console.log(resolve);
        this.isProcessingRequest.set(false);
        onResolve();
      });

    return true;
  }

  ngOnDestroy(): void {
    this.cancelRequest();
  }
}
