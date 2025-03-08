import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { BaseButton } from '../../atoms/base-button/base-button';
import { CommonModule } from '@angular/common';
import { Icon } from '../../atoms/icon/icon';

@Component({
  selector: 'list-button',
  standalone: true,
  imports: [CommonModule, BaseButton, Icon],
  templateUrl: './list-button.html',
  styleUrl: './list-button.scss'
})
export class ListButton {
  @Input() text: string = '';
  @Input() iconName: string = '';
  @Input() isSelected: boolean = false;

  @Input() openOptionsOnIconClick = false;

  @ViewChild('options') options!: ElementRef;

  isHovering: boolean = false;

  optionsClass: 'closed' | 'open' = 'closed';

  @Output() onClickButton = new EventEmitter<void>();
  @Output() onClickIcon = new EventEmitter<void>();

  clickIcon() {
    this.onClickIcon.emit();
  }
}
