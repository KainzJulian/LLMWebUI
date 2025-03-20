import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'floating-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-panel.html',
  styleUrl: './floating-panel.scss'
})
export class FloatingPanel {
  @Input() config: FloatingPanelConfig = {};
  @Input() centered: boolean = false;
  @Input() closeOnClickOutside: boolean = false;
}

interface FloatingPanelConfig {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  width?: string;
  height?: string;
}
