import { HttpClient } from '@angular/common/http';
import { Component, effect, ElementRef, signal, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';
import { LLMRequestService } from '../../services/llm-request.service';
import { BaseButton } from '../../atoms/base-button/base-button';
import { Icon } from '../../atoms/icon/icon';
import { ReadListenStateService } from '../../services/readListen-state.service';

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

  @ViewChild('toggleVoiceInput') toggleVoiceInput!: Icon;
  @ViewChild('toggleReadOutput') toggleReadOutput!: Icon;

  constructor(
    private http: HttpClient,
    public chatService: ChatService,
    public modelService: ModelService,
    public llmService: LLMRequestService,
    public readListenStateService: ReadListenStateService
  ) {
    effect(() => {
      if (this.readListenStateService.getListenState()) {
        this.toggleVoiceInput.iconName = 'mic-on-light';
      } else {
        this.toggleVoiceInput.iconName = 'mic-off-light';
      }

      if (this.readListenStateService.getReadState()) {
        this.toggleReadOutput.iconName = 'speaker-on-light';
      } else {
        this.toggleReadOutput.iconName = 'speaker-off-light';
      }
    });
  }

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

  uploadFile() {
    this.llmService.uploadFile();
  }

  listenUserInput() {
    this.readListenStateService.switchListenState();
  }

  readAIOutput() {
    this.readListenStateService.switchReadState();
  }
}
