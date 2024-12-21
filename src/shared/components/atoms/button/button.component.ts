import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chat, ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() type: 'chat' | 'ai' = 'chat';
  @Input() iconName: string = '';

  @Input() test!: Chat;

  isHovering: boolean = false;

  constructor(private chatService: ChatService) {}

  onClickPrimary() {
    this.chatService.currentChat = this.test;
  }

  onClickSecondary() {
    console.log('test');
  }
}
