import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { BaseButton } from '../../atoms/base-button/base-button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'list-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-button.html',
  styleUrl: './list-button.scss',
})
export class ListButton {
  @Input() text: string = '';
  @Input() iconName: string = '';
  @Input() isSelected: boolean = false;

  isHovering: boolean = false;

  @Output() onClickButton = new EventEmitter<void>();
  @Output() onClickIcon = new EventEmitter<void>();
}
