import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild
} from '@angular/core';

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

  @Output() onClickOutside = new EventEmitter<void>();

  @ViewChild('floatingPanel', { read: ElementRef }) floatingPanel!: ElementRef;

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.floatingPanel == undefined) return;

    if (this.closeOnClickOutside) {
      const target = event.target as HTMLElement;

      if (!this.floatingPanel.nativeElement.contains(target)) {
        this.onClickOutside.emit();
      }
    }
  }
}

interface FloatingPanelConfig {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  width?: string;
  height?: string;
}
