import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { BaseButton } from '../base-button/base-button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'list-button',
  standalone: true,
  imports: [CommonModule, BaseButton],
  templateUrl: './list-button.html',
  styleUrl: './list-button.scss',
})
export class ListButton {
  @Input() text: string = '';
  @Input() iconName: string = '';
  @Input() isSelected: boolean = false;

  @Input() openOptionsOnIconClick = false;

  @ViewChild('options') options!: ElementRef;

  isHovering: boolean = false;

  optionsClass: 'closed' | 'open' = 'closed';

  @Output() onClickButton = new EventEmitter<void>();
  @Output() onClickIcon = new EventEmitter<void>();

  clickIcon() {
    // if (this.openOptionsOnIconClick) {
    //   this.optionsClass = this.optionsClass == 'closed' ? 'open' : 'closed';
    // } else {
    this.onClickIcon.emit();
    // }
  }

  // @HostListener('document:click', ['$event'])
  // onClickOutside(event: Event) {
  //   console.log(this.options);

  //   if (!this.options.nativeElement.contains(event.target))
  //     this.optionsClass = 'closed';
  // }
}
