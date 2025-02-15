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
  @Input() config: Partial<BaseButtonConfig> = {
    iconName: '',
    buttonText: '',
    buttonType: 'icon',
    buttonClasses: ['base-button'],
  };

  @Output() onClick = new EventEmitter<void>();
}

interface BaseButtonConfig {
  iconName?: string;
  buttonText?: string;
  buttonType: string;
  buttonClasses?: string[];
}
