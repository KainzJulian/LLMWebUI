import { Component, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { LLMRequestService } from '../../services/llm-request.service';
import { BaseButton } from '../../atoms/base-button/base-button';
import { Icon } from '../../atoms/icon/icon';
import { LoadingStateService } from '../../services/loading-state.service';

@Component({
  selector: 'app-output-field',
  standalone: true,
  imports: [CommonModule, BaseButton, Icon],
  templateUrl: './output-field.component.html',
  styleUrl: './output-field.component.scss'
})
export class OutputFieldComponent {
  @Input() text: string = '';
  @Input() textStyle: 'text--user' | 'text--ai' = 'text--ai';

  @Input() isLastElement: boolean = false;

  constructor(
    public chatService: ChatService,
    private llmService: LLMRequestService,
    public loadingState: LoadingStateService
  ) {}

  public copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  regenerateResponse() {
    if (this.chatService.currentChat == null) return;

    const size = this.chatService.currentChat.convo.length;
    const convo = this.chatService.currentChat.convo[size - 2];

    this.chatService.currentChat.convo.pop();
    this.chatService.currentChat.convo.pop();

    this.llmService.sendRequest(this.chatService.currentChat, convo?.content);
  }

  isAiText(): boolean {
    return this.textStyle == 'text--ai';
  }
}
