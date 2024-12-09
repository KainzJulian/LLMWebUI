import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() type: 'chat' | 'ai' = 'chat';
  @Input() iconName: string = '';

  isHovering: boolean = false;
}
