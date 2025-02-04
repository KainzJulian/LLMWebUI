import { HttpClient } from '@angular/common/http';
import {
  Component,
  effect,
  ElementRef,
  model,
  signal,
  ViewChild,
} from '@angular/core';
import { ENV } from '../../../../environments/environment';
import { ChatService } from '../../services/chat.service';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';
import { LLMRequestService } from '../../services/llm-request.service';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  inputText: string = '';
  @ViewChild('input') input!: ElementRef;
  @ViewChild('sendButton') sendButton!: ElementRef;

  public isLoading = signal(false);

  constructor(
    private http: HttpClient,
    public chatService: ChatService,
    public modelService: ModelService,
    public llmService: LLMRequestService
  ) {
    effect(() => {
      console.warn('is Loading: ' + this.isLoading());

      if (this.isLoading()) {
        this.changeIcon('close-light.svg');
      } else {
        this.changeIcon('send-light.svg');
      }
    });
  }

  sendRequest(input: string) {
    if (input == '') return;

    this.clearInput();
    this.isLoading.set(true);

    this.llmService.sendRequest(this.chatService.currentChat, input);

    console.log(this.chatService.currentChat?.convo);

    const lastConvo = this.chatService.currentChat?.convo.at(-1);
    if (this.chatService.currentChat == null || lastConvo == undefined) return;

    this.chatService.addConvo(lastConvo, this.chatService.currentChat.id);
  }

  cancelRequest() {
    this.isLoading.set(false);

    this.llmService.cancelRequest();
  }

  changeIcon(icon: string) {
    this.sendButton.nativeElement.src = '/icons/' + icon;
  }

  clearInput() {
    this.input.nativeElement.value = '';
  }
}
