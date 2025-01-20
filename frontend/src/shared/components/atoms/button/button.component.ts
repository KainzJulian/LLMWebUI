import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  isHovering: boolean = false;
  @Input() isSelected: boolean = false;

  @Output() clickButton = new EventEmitter<void>();
  @Output() clickIcon = new EventEmitter<void>();

  @Input() index!: number;

  @Input() text: string = '';
  @Input() iconName: string = '';

  constructor(private chatService: ChatService) {}

  onClickButton() {
    this.clickButton.emit();
  }

  onClickIcon() {
    this.clickIcon.emit();
  }
}
