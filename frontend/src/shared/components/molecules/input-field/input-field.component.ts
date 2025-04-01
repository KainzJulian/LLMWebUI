import { Component, effect, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';
import { LLMRequestService } from '../../services/llm-request.service';
import { BaseButton } from '../../atoms/base-button/base-button';
import { Icon } from '../../atoms/icon/icon';
import { ReadListenStateService } from '../../services/readListen-state.service';
import { LoadingStateService } from '../../services/loading-state.service';
import { FileUploaderService } from '../../services/file-uploader.service';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, BaseButton, Icon],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent {
  @ViewChild('input') input!: ElementRef;

  @ViewChild('toggleVoiceInput') toggleVoiceInput!: Icon;
  @ViewChild('toggleReadOutput') toggleReadOutput!: Icon;

  constructor(
    public chatService: ChatService,
    public modelService: ModelService,
    public llmService: LLMRequestService,
    public readListenStateService: ReadListenStateService,
    public loadingState: LoadingStateService,
    public fileUploaderService: FileUploaderService
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
    if (input == '' || this.loadingState.isLoading()) return;

    this.clearInput();

    this.llmService.sendRequest(this.chatService.currentChat, input);

    const lastConvo = this.chatService.currentChat?.convo.at(-1);
    if (this.chatService.currentChat == null || lastConvo == undefined) return;

    this.chatService.addConvo(lastConvo, this.chatService.currentChat.id);
  }

  cancelRequest() {
    this.llmService.cancelRequest();

    const lastConvo = this.chatService.currentChat?.convo.at(-1);
    if (this.chatService.currentChat == null || lastConvo == undefined) return;

    this.chatService.addConvo(lastConvo, this.chatService.currentChat.id);
  }

  clearInput() {
    this.input.nativeElement.value = '';
  }

  uploadFile() {
    if (this.chatService.currentChat == null) return;

    this.fileUploaderService.setFileData(this.chatService.currentChat.id);
    this.fileUploaderService.switchOpenState();
  }

  listenUserInput() {
    this.readListenStateService.switchListenState();
  }

  readAIOutput() {
    this.readListenStateService.switchReadState();
  }
}
