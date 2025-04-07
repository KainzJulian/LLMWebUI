import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'base-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-button.html',
  styleUrl: './base-button.scss'
})
export class BaseButton {
  @Input() buttonClass: string = 'hover--icon';
  @Input() tooltipText: string = '';
  @Input() position: 'top' | 'right' | 'bottom' | 'left' = 'top';

  @Output() onClick = new EventEmitter<void>();

  constructor() {}
}
