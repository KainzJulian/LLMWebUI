import { HttpClient } from '@angular/common/http';
import { Component, effect, ElementRef, model, ViewChild } from '@angular/core';
import { ENV } from '../../../../environments/environment';
import { ChatService } from '../../services/chat.service';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';
import { LLMRequestService } from '../../services/llm-request.service';
import { SubscriptionService } from '../../services/subscription.service';

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

  buttonState: 'cancelRequest' | 'sendRequest' = 'sendRequest';

  constructor(
    private http: HttpClient,
    public chatService: ChatService,
    public modelService: ModelService,
    public llmService: LLMRequestService,
    public subService: SubscriptionService
  ) {
    effect(() => {
      if (this.llmService.isProcessingRequest()) {
        this.changeIcon('close-light.svg');
        this.buttonState = 'cancelRequest';
      } else {
        this.changeIcon('send-light.svg');
        this.buttonState = 'sendRequest';
      }
    });
  }

  processInput(input: string) {
    if (this.buttonState == 'cancelRequest') {
      this.llmService.cancelRequest();
      this.buttonState = 'sendRequest';
      this.sendButton.nativeElement.src = '/icons/send-light.svg';
    }

    if (input == '') return;

    this.clearInput();

    const res = this.llmService.sendRequest(
      this.chatService.currentChat,
      input,
      true,
      () => {
        this.sendButton.nativeElement.src = '/icons/send-light.svg';
        this.buttonState = 'sendRequest';
      }
    );

    if (res && this.buttonState == 'sendRequest') {
      this.sendButton.nativeElement.src = '/icons/close-light.svg';
      this.clearInput();

      this.buttonState = 'cancelRequest';
    }
  }

  changeIcon(icon: string) {
    this.sendButton.nativeElement.src = '/icons/' + icon;
  }

  clearInput() {
    this.input.nativeElement.value = '';
  }
}
