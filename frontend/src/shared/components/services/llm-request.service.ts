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

  public async sendRequest(
    currentChat: Chat | null,
    text: string = '',
    hasSessionMemory: boolean = true,
    onResolve: Function = Function
  ) {
    // console.log('current Chat:' + currentChat);
    // console.log('processing: ' + this.isProcessingRequest());

    // if (currentChat == null || this.isProcessingRequest()) return false;

    // const newConvo = new Convo({ role: 'user', content: text });

    // currentChat.addNewConvo(newConvo);

    // let convo: Convo[] = [];
    // if (hasSessionMemory) convo = currentChat.convo;
    // else convo.push(newConvo);

    // console.log(convo);

    // const convoList = convo;

    // this.isProcessingRequest.set(true);

    // let url = ENV.generateURL;
    // url.searchParams.set('modelName', currentChat.modelName);

    // await fetch(url, { method: 'post', body: JSON.stringify(convoList) })
    //   .then(async (response) => {
    //     const reader = response.body?.getReader();
    //     const decoder = new TextDecoder();

    //     if (!reader) throw new Error('No Reader');

    //     let test = '';

    //     while (true) {
    //       const { done, value } = await reader?.read();

    //       if (done) break;

    //       const chunk = decoder.decode(value, { stream: true });

    //       test += chunk;

    //       console.log(chunk);
    //     }
    //   })
    //   .catch((error) => {
    //     throw error;
    //   });

    // this.sub = this.http
    //   .post<any>(ENV.generateURL.href, convoList)
    //   .subscribe((resolve) => {
    //     resolve;

    //     this.sub?.unsubscribe();
    //     currentChat?.addNewConvo(new Convo(resolve?.response));
    //     console.log(resolve);
    //     this.isProcessingRequest.set(false);
    //     onResolve();
    //   });

    return true;
  }

  ngOnDestroy(): void {
    this.cancelRequest();
  }
}
