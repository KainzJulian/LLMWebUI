import { Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV } from '../../../environments/environment';
import { Subscription, tap } from 'rxjs';
import { Chat } from '../../types/chat';
import { Convo, ConvoResponse } from '../../types/convo';
import { ChatService } from './chat.service';

//TODO: alle Subscriptions in ein service geben und funktionen dort verwenden
@Injectable({
  providedIn: 'root',
})
export class LLMRequestService implements OnDestroy {
  private sub: Subscription | null = null;
  public isProcessingRequest = signal(false);

  constructor(private http: HttpClient, private chatService: ChatService) {}

  public cancelRequest() {
    console.warn('Canceled Request');
    this.isProcessingRequest.set(false);
    this.sub?.unsubscribe();
  }

  public async sendRequest(
    currentChat: Chat | null,
    text: string = '',
    hasSessionMemory: boolean = true,
    onResolve: Function = Function
  ) {
    if (currentChat == null) return;

    const newConvo = new Convo({ role: 'user', content: text });

    console.log(currentChat.convo);

    currentChat.convo.push(newConvo);

    const convo = currentChat.convo;

    let url = ENV.generateURL;
    url.searchParams.set('modelName', currentChat.modelName);

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(convo),
    })
      .then((response) => response.body?.getReader())
      .then(async (reader) => {
        const decoder = new TextDecoder();
        let chunkbuilder = '';

        if (reader == null) return;

        currentChat.convo.push({
          content: '',
          role: 'assistant',
        });

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          currentChat?.addContent(chunk);
        }
      })
      .then(() => {
        const convo = currentChat.convo.at(-1);

        if (convo == undefined) return;
        this.chatService.addConvo(convo, currentChat.id);
      });
  }

  ngOnDestroy(): void {
    this.cancelRequest();
  }
}
