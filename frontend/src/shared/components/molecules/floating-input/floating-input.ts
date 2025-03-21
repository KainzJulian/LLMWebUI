import { Component, EventEmitter, Output } from '@angular/core';
import { FloatingInputStateService } from '../../services/floating-input-state.service';
import { FloatingPanel } from '../../atoms/floating-panel/floating-panel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'floating-input',
  standalone: true,
  imports: [FloatingPanel, CommonModule, FormsModule],
  templateUrl: './floating-input.html',
  styleUrl: './floating-input.scss'
})
export class FloatingInput {
  constructor(public floatingInputService: FloatingInputStateService) {}

  @Output() onEnter = new EventEmitter<string>();
  @Output() onClickOutside = new EventEmitter<string>();

  enter() {
    this.floatingInputService.setFloatingInputState(false);
    this.onEnter.emit(this.floatingInputService.chat().name);
  }

  clickOutside() {
    this.onClickOutside.emit(this.floatingInputService.chat().name);
    this.floatingInputService.setFloatingInputState(false);
  }
}
