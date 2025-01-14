import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, model, ViewChild } from '@angular/core';
import { ENV } from '../../../../environments/environment';
import { ChatService } from '../../services/chat.service';
import { Convo, ConvoResponse } from '../../services/convo.service';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';
import { LlmRequestService } from '../../services/llm-request.service';

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
    public llmService: LlmRequestService
  ) {}

  processInput(input: string) {
    // if (this.buttonState == 'cancelRequest') {
    //   this.llmService.cancelRequest();
    //   this.buttonState = 'sendRequest';
    //   this.sendButton.nativeElement.src = '/icons/send-light.svg';
    // }

    if (input == '') return;

    this.clearInput();

    this.llmService
      .sendRequest(this.chatService.currentChat, input)
      ?.subscribe((value) => {
        console.log(value);
      });

    // if (worked && this.buttonState == 'sendRequest') {
    //   this.sendButton.nativeElement.src = '/icons/close-light.svg';
    //   this.clearInput();

    //   this.buttonState = 'cancelRequest';
    // }
  }

  clearInput() {
    this.input.nativeElement.value = '';
  }
}
