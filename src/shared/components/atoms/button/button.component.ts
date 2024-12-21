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
  @Input() iconName: string = '';

  @Input() test!: Chat;
  @Input() index!: number;

  isHovering: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    console.log(this.index);
  }

  onClickPrimary() {
    if (this.test) this.chatService.currentChat = this.test;
  }

  onClickSecondary() {
    if (this.index != null) this.chatService.chatList.splice(this.index, 1);
  }
}
