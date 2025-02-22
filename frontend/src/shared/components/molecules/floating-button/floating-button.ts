import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseButton } from '../../atoms/base-button/base-button';
import { Icon } from '../../atoms/icon/icon';

@Component({
  selector: 'floating-button',
  standalone: true,
  imports: [CommonModule, BaseButton, Icon],
  templateUrl: './floating-button.html',
  styleUrl: './floating-button.scss'
})
export class FloatingButton {
  @Input() config: FloatingButtonConfig = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  @Input() iconName: string = '';

  @Output() onClick = new EventEmitter<void>();
}

interface FloatingButtonConfig {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
