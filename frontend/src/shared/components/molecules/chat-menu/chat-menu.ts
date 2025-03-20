import { Component, EventEmitter, Output } from '@angular/core';
import { BaseButton } from '../../atoms/base-button/base-button';
import { Icon } from '../../atoms/icon/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chat-menu',
  standalone: true,
  imports: [BaseButton, Icon, CommonModule],
  templateUrl: './chat-menu.html',
  styleUrl: './chat-menu.scss'
})
export class ChatMenu {
  @Output() delete = new EventEmitter<void>();
  @Output() rename = new EventEmitter<void>();
  @Output() archive = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();

  onDelete() {
    this.delete.emit();
  }

  onRename() {
    this.rename.emit();
  }

  onArchive() {
    this.archive.emit();
  }

  onDownload() {
    this.download.emit();
  }
}
