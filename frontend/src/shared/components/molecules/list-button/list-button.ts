import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { BaseButton } from '../../atoms/base-button/base-button';
import { CommonModule } from '@angular/common';
import { Icon } from '../../atoms/icon/icon';
import { ChatMenu } from '../chat-menu/chat-menu';

@Component({
  selector: 'list-button',
  standalone: true,
  imports: [CommonModule, BaseButton, Icon, ChatMenu],
  templateUrl: './list-button.html',
  styleUrl: './list-button.scss'
})
export class ListButton {
  @Input() text: string = '';
  @Input() iconName: string = '';
  @Input() isSelected: boolean = false;

  isHovering: boolean = false;

  @Output() onClickButton = new EventEmitter<void>();
  @Output() onClickIcon = new EventEmitter<void>();

  @Input() showMenuOnIconClick: boolean = false;
  public isShown: boolean = false;

  @ViewChild('chatMenu', { read: ElementRef }) chatMenu!: ElementRef;

  @Output() delete = new EventEmitter<void>();
  @Output() rename = new EventEmitter<string>();
  @Output() download = new EventEmitter<void>();
  @Output() archive = new EventEmitter<void>();

  clickIcon() {
    if (this.showMenuOnIconClick) this.switchMenu();

    this.onClickIcon.emit();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.chatMenu == undefined) return;

    if (this.isShown) {
      const target = event.target as HTMLElement;

      if (!this.chatMenu.nativeElement.contains(target)) {
        this.hideMenu();
      }
    }
  }

  onDelete() {
    this.hideMenu();
    this.delete.emit();
  }

  onRename() {
    this.hideMenu();
    this.rename.emit();
  }

  onArchive() {
    this.hideMenu();
    this.archive.emit();
  }

  onDownload() {
    this.hideMenu();
    this.download.emit();
  }

  hideMenu() {
    this.isShown = false;
  }

  showMeu() {
    this.isShown = true;
  }

  switchMenu() {
    this.isShown = !this.isShown;
  }
}
