import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseButton } from '../../atoms/base-button/base-button';
import { Icon } from '../../atoms/icon/icon';
import { FileData } from '../../../types/file';

@Component({
  selector: 'file-list-item',
  standalone: true,
  imports: [BaseButton, Icon],
  templateUrl: './file-list-item.html',
  styleUrl: './file-list-item.scss'
})
export class FileListItem {
  @Output() onClick = new EventEmitter<void>();

  @Input() fileData: FileData = new FileData();

  clickButton() {
    this.onClick.emit();
  }
}
