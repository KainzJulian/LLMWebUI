import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'base-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-button.html',
  styleUrl: './base-button.scss'
})
export class BaseButton {
  @Input() buttonClass: string = 'hover--icon';

  @Output() onClick = new EventEmitter<void>();

  constructor() {}
}
