import { Component, Input } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-output-field',
  standalone: true,
  imports: [],
  templateUrl: './output-field.component.html',
  styleUrl: './output-field.component.scss',
})
export class OutputFieldComponent {
  @Input() text: string = '';
  @Input() textStyle: 'humanText' | 'aiText' = 'aiText';

  constructor(
    private modelService: ModelService,
    private chatService: ChatService
  ) {}

  public copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  regenerateResponse(text: string) {
    const size = this.chatService.currentChat.convo.length;
    const convo = this.chatService.currentChat.convo[size - 2];

    this.chatService.currentChat.convo.pop();
    this.chatService.currentChat.convo.pop();

    this.modelService.sendRequest(convo?.content);
  }
}
