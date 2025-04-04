import {
  Component,
  computed,
  effect,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { BaseButton } from '../../atoms/base-button/base-button';
import { Icon } from '../../atoms/icon/icon';
import { CommonModule } from '@angular/common';
import { FileUploaderService } from '../../services/file-uploader.service';

@Component({
  selector: 'file-list-item',
  standalone: true,
  imports: [BaseButton, Icon, CommonModule],
  templateUrl: './file-list-item.html',
  styleUrl: './file-list-item.scss'
})
export class FileListItem {
  @Output() onClick = new EventEmitter<void>();

  @ViewChild('progressBar', { read: ElementRef }) progressBar!: ElementRef;

  @Input() fileIndex!: number;

  public fileItem = computed(() => this.fileUploaderService.fileDataList()[this.fileIndex]);

  constructor(public fileUploaderService: FileUploaderService) {
    effect(() => {
      if (this.fileItem() == undefined || !this.fileItem().isUploading) return;

      const progress = 94.2 - (this.fileItem().uploadProgress / 100) * 94.2;
      this.progressBar.nativeElement.style.strokeDashoffset = progress + 'px';
    });
  }

  clickButton() {
    this.onClick.emit();
  }
}
