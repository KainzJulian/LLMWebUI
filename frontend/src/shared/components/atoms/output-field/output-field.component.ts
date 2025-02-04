import { Component, Input } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { LLMRequestService } from '../../services/llm-request.service';

@Component({
  selector: 'app-output-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './output-field.component.html',
  styleUrl: './output-field.component.scss',
})
export class OutputFieldComponent {
  @Input() text: string = '';
  @Input() textStyle: 'humanText' | 'aiText' = 'aiText';

  @Input() isLastElement: boolean = false;

  constructor(
    private modelService: ModelService,
    private chatService: ChatService,
    private llmService: LLMRequestService
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
    return this.textStyle == 'aiText';
  }
}
