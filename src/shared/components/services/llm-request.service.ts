import { Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { Chat, ChatService } from './chat.service';
import { HttpClient } from '@angular/common/http';
import { ModelArray, ModelService } from './model.service';
import { ENV } from '../../../environments/environment';
import { Observable, Subscription, tap } from 'rxjs';
import { Convo, ConvoResponse } from './convo.service';

//TODO: alle model request und response von modelservice und chatService hier verarbeiten
@Injectable({
  providedIn: 'root',
})
export class LlmRequestService implements OnDestroy {
  private controller?: AbortController;

  public isProcessingRequest = (): boolean => {
    return this.controller != null;
  };

  constructor(private http: HttpClient) {}

  public cancelRequest() {
    console.warn('Canceled Request');
    this.controller?.abort();
  }

  public sendRequest(
    currentChat: Chat | null,
    text: string = '',
    hasSessionMemory: boolean = true
  ): Observable<ConvoResponse> | null {
    if (currentChat == null || this.isProcessingRequest()) return null;

    const model = currentChat.modelName;

    const newConvo = new Convo({ role: 'user', content: text });
    currentChat.addNewConvo(newConvo);

    let convo: Convo[] = [];
    if (hasSessionMemory) convo = currentChat.convo;
    else convo.push(newConvo);

    console.log(convo);

    const body = `{"model": "${model}", "messages": ${JSON.stringify(
      convo
    )}, "stream": false}`;

    this.controller = new AbortController();

    return this.http.post<ConvoResponse>(ENV.generateURL, body).pipe(
      tap((resolve) => {
        this.controller?.signal;
        currentChat?.addNewConvo(new Convo(resolve.message));
        console.log(resolve);
      })
    );
  }

  ngOnDestroy(): void {
    this.cancelRequest();
  }
}
