import { Injectable, OnDestroy } from '@angular/core';
import { ENV } from '../../../environments/environment';
import { Chat } from '../../types/chat';
import { Convo } from '../../types/convo';
import { ChatService } from './chat.service';
import { LoadingStateService } from './loading-state.service';

@Injectable({
  providedIn: 'root'
})
export class LLMRequestService implements OnDestroy {
  protected abortController: AbortController | null = null;

  constructor(
    private chatService: ChatService,
    private loadingState: LoadingStateService
  ) {}

  public cancelRequest() {
    if (this.abortController == null) return;

    try {
      this.abortController.abort('Cancelled Request to LLM');
      this.abortController = null;
      this.loadingState.set(false);
    } catch (error) {
      console.log('Request canceled: ' + error);
    }
  }

  public async sendRequest(currentChat: Chat | null, text: string = '') {
    if (currentChat == null || this.loadingState.isLoading()) return;

    this.loadingState.set(true);

    const abortController = new AbortController();
    const signal = abortController.signal;

    const newConvo = new Convo({ role: 'user', content: text });

    currentChat.convo.push(newConvo);

    const convo = currentChat.convo;

    const url = ENV.generateURL;
    url.searchParams.set('id', currentChat.id);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(convo),
      signal: signal
    })
      .then((response) => response.body?.getReader())
      .then(async (reader) => {
        const decoder = new TextDecoder();

        if (reader == null) return;

        currentChat.convo.push({
          content: '',
          role: 'assistant'
        });

        while (true) {
          const { done, value } = await reader.read();

          if (done) return;

          const chunk = decoder.decode(value, { stream: true });
          currentChat?.addContent(chunk);
        }
      })
      .then(() => {
        const convo = currentChat.convo.at(-1);

        if (convo == undefined) return;

        this.chatService.addConvo(convo, currentChat.id);

        this.loadingState.set(false);
      })
      .catch((error) => console.warn(error));

    this.abortController = abortController;
  }

  ngOnDestroy(): void {
    this.cancelRequest();
  }

  uploadFile() {
    throw new Error('Method not implemented.');
  }

  generateImage() {
    throw new Error('Method not implemented.');
  }
}
