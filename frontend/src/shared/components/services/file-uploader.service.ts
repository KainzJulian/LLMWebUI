import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { FileData } from '../../types/file';
import { BackendResponse } from '../../types/response';
import { ENV } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {
  private isOpenState = signal(false);
  public fileDataList = signal<FileData[]>([]);

  public currentChatID: string = '';

  public ajax = new XMLHttpRequest();

  constructor(public http: HttpClient) {}

  switchOpenState() {
    this.isOpenState.set(!this.isOpenState());
  }

  setOpenState(state: boolean) {
    this.isOpenState.set(state);
  }

  getOpenState() {
    return this.isOpenState();
  }

  public abort() {
    this.ajax.abort();
    this.fileDataList.update((listData) => {
      return listData.filter((data) => !data.isUploading);
    });
  }

  saveFiles($event: Event) {
    const input = $event as DragEvent;

    if (input == null || input.dataTransfer == null) return;
    if (input.dataTransfer.files == null || input.dataTransfer.files.length <= 0) return;

    const newFiles = Array.from(input.dataTransfer.files);

    newFiles.forEach((file) => {
      this.saveFile(file);
    });
  }

  saveFile(file: File) {
    const url = new URL(ENV.fileRoute.href + '/upload/' + this.currentChatID);
    const fileData = new FileData(
      crypto.randomUUID(),
      file.name,
      file.type,
      file.size,
      file,
      true,
      0
    );
    this.fileDataList.update(() => [...this.fileDataList(), fileData]);

    url.searchParams.append('fileID', fileData.id);

    const formData = new FormData();
    formData.append('file', file);

    this.ajax.upload.addEventListener('progress', (event) => {
      console.log('Event Loaded', event.loaded, 'Event total', event.total);

      const progress = Math.round((100 * event.loaded) / event.total);

      this.fileDataList.update((data) => {
        return data.map((item) =>
          item.id === fileData.id ? { ...item, uploadProgress: progress, isUploading: true } : item
        );
      });
    });

    this.ajax.upload.addEventListener('load', (event) => {
      console.log('upload completed', event.total);

      this.fileDataList.update((data) => {
        return data.map((item) =>
          item.id === fileData.id ? { ...item, uploadProgress: 100, isUploading: false } : item
        );
      });
    });

    this.ajax.upload.addEventListener('abort', () => {
      console.error('Aported');
    });

    this.ajax.upload.addEventListener('error', () => {
      console.error('Error');
    });

    this.ajax.open('POST', url);
    this.ajax.send(formData);
  }

  deleteFile(index: number) {
    const file = this.fileDataList().at(index);
    if (file == null) return;

    this.fileDataList.set([
      ...this.fileDataList().slice(0, index),
      ...this.fileDataList().slice(index + 1)
    ]);

    const url = new URL(ENV.fileRoute.href + '/delete/' + this.currentChatID);
    url.searchParams.append('fileID', file.id);

    this.http.delete<BackendResponse<boolean>>(url.href).subscribe((res) => {
      if (res.error != null) throw new Error(res.error);
    });
  }

  setFileData(id: string) {
    if (this.currentChatID == id) return;

    this.fileDataList.set([]);
    this.currentChatID = id;

    this.http.get<BackendResponse<FileData[]>>(ENV.fileRoute.href + '/' + id).subscribe((res) => {
      if (res.data == null) return;
      this.fileDataList.set(res.data);
    });
  }
}
