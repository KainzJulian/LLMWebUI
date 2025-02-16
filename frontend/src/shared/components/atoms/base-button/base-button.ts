import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'base-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-button.html',
  styleUrl: './base-button.scss',
})
export class BaseButton {
  @Input() iconName?: string = '';
  @Input() buttonText?: string = '';
  @Input() buttonType: string = 'text';
  @Input() buttonClasses?: string[] = [];

  @Output() onClick = new EventEmitter<void>();
}
