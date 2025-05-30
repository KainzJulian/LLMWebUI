import { Component, signal } from '@angular/core';
import { FloatingPanel } from '../../atoms/floating-panel/floating-panel';
import { FileUploaderService } from '../../services/file-uploader.service';
import { CommonModule } from '@angular/common';
import { BaseButton } from '../../atoms/base-button/base-button';
import { Icon } from '../../atoms/icon/icon';
import { FileListItem } from '../file-list-item/file-list-item';
import { FloatingInfoService } from '../../services/floating-info.service';

@Component({
  selector: 'file-uploader',
  standalone: true,
  imports: [FloatingPanel, CommonModule, BaseButton, Icon, FileListItem],
  templateUrl: './file-uploader.html',
  styleUrl: './file-uploader.scss'
})
export class FileUploader {
  public isDragging = signal(false);

  constructor(
    public fileUploaderService: FileUploaderService,
    public floatingInfoService: FloatingInfoService
  ) {}

  deleteFile(index: number) {
    this.fileUploaderService.deleteFile(index);
  }

  onDragOver($event: DragEvent) {
    $event.preventDefault();

    this.isDragging.set(true);
  }

  onDrop($event: DragEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    this.isDragging.set(false);

    if ($event.dataTransfer == null || $event.dataTransfer.files.length <= 0) return;

    for (const item of Array.from($event.dataTransfer.items)) {
      const entry = item.webkitGetAsEntry();

      if (entry == null) continue;

      this.processEntry(entry);
    }
  }

  onDragLeave($event: DragEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    this.isDragging.set(false);
  }

  handleFileSelection($event: Event) {
    $event.preventDefault();

    const input = $event.target as HTMLInputElement;
    if (input.files == null || input.files.length <= 0) return;

    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      this.fileUploaderService.saveFile(file);
    }
  }

  processEntry(entry: FileSystemEntry, path = '') {
    if (entry.isFile) {
      (entry as FileSystemFileEntry).file((file) => {
        if (file.size == 0) {
          this.floatingInfoService.show(
            'The provided file <strong>' + file.name + '</strong> is empty',
            5000
          );
          return;
        }
        this.fileUploaderService.saveFile(file);
      });
    } else if (entry.isDirectory) {
      const reader = (entry as FileSystemDirectoryEntry).createReader();

      reader.readEntries((entries: FileSystemEntry[]) => {
        for (const entry of entries) {
          this.processEntry(entry, path + entry.name + '/');
        }
      });
    }
  }
}
