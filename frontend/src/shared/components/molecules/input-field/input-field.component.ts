import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';
import { LLMRequestService } from '../../services/llm-request.service';
import { BaseButton } from '../../atoms/base-button/base-button';
import { Icon } from '../../atoms/icon/icon';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, BaseButton, Icon],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent {
  @ViewChild('input') input!: ElementRef;

  public isLoading = signal(false);

  constructor(
    private http: HttpClient,
    public chatService: ChatService,
    public modelService: ModelService,
    public llmService: LLMRequestService
  ) {}

  sendRequest(input: string) {
    if (input == '' || this.isLoading()) return;

    this.clearInput();
    this.isLoading.set(true);

    this.llmService.sendRequest(this.chatService.currentChat, input, () =>
      this.isLoading.set(false)
    );

    const lastConvo = this.chatService.currentChat?.convo.at(-1);
    if (this.chatService.currentChat == null || lastConvo == undefined) return;

    this.chatService.addConvo(lastConvo, this.chatService.currentChat.id);
  }

  cancelRequest() {
    this.llmService.cancelRequest();
    this.isLoading.set(false);

    const lastConvo = this.chatService.currentChat?.convo.at(-1);
    if (this.chatService.currentChat == null || lastConvo == undefined) return;

    this.chatService.addConvo(lastConvo, this.chatService.currentChat.id);
  }

  clearInput() {
    this.input.nativeElement.value = '';
  }
}
