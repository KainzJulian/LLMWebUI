import { Component, Input } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';

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
    private chatService: ChatService
  ) {}

  public copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  regenerateResponse() {
    if (this.chatService.currentChat == undefined) return;

    const size = this.chatService.currentChat.convo.length;
    const convo = this.chatService.currentChat.convo[size - 2];

    this.chatService.currentChat.convo.pop();
    this.chatService.currentChat.convo.pop();

    this.modelService.sendRequest(convo?.content);
  }
}
