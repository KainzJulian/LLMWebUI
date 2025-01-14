import { Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { Chat, ChatService } from './chat.service';
import { HttpClient } from '@angular/common/http';
import { ModelArray, ModelService } from './model.service';
import { ENV } from '../../../environments/environment';
import { Observable, Subscription, tap } from 'rxjs';
import { Convo, ConvoResponse } from './convo.service';
import { SubscriptionService } from './subscription.service';

//TODO: alle Subscriptions in ein service geben und funktionen dort verwenden
@Injectable({
  providedIn: 'root',
})
export class LLMRequestService implements OnDestroy {
  private sub: Subscription | null = null;

  public isProcessingRequest = (): boolean => {
    if (this.sub == undefined) return false;
    return !this.sub.closed;
  };

  constructor(
    private http: HttpClient,
    private subService: SubscriptionService
  ) {}

  public cancelRequest() {
    console.warn('Canceled Request');
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

    this.sub = this.http
      .post<ConvoResponse>(ENV.generateURL, body)
      .subscribe((resolve) => {
        this.sub?.unsubscribe();
        currentChat?.addNewConvo(new Convo(resolve.message));
        console.log(resolve);
        onResolve();
      });

    return true;
  }

  ngOnDestroy(): void {
    this.cancelRequest();
  }
}
