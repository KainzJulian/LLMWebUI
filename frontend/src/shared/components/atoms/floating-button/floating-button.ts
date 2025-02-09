import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'floating-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-button.html',
  styleUrl: './floating-button.scss',
})
export class FloatingButton {
  @Input() config: FloatingButtonConfig = {
    iconName: '',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  @Output() onClick = new EventEmitter<void>();
}

interface FloatingButtonConfig {
  iconName?: string;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
