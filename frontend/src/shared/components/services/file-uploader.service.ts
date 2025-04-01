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
  public fileDataList: FileData[] = [];

  public currentChatID: string = '';

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
    const url = ENV.fileRoute.href + '/upload/' + this.currentChatID;

    const formData = new FormData();

    formData.append('file', file);

    this.http.post<BackendResponse<string>>(url, formData).subscribe((res) => {
      if (res.data == null) return;

      const fileData = new FileData(res.data, file.name, file.type, file.size, file);

      this.fileDataList.push(fileData);
    });
  }

  deleteFile(index: number) {
    const file = this.fileDataList.splice(index, 1);

    const url = new URL(ENV.fileRoute.href + '/delete/' + this.currentChatID);
    url.searchParams.append('fileID', file[0].id);

    this.http.delete<BackendResponse<boolean>>(url.href).subscribe((res) => {
      if (res.error != null) throw new Error(res.error);
    });
  }

  uploadFiles() {
    this.isOpenState.set(false);
  }

  setFileData(id: string) {
    if (this.currentChatID == id) return;

    this.fileDataList = [];
    this.currentChatID = id;

    this.http.get<BackendResponse<FileData[]>>(ENV.fileRoute.href + '/' + id).subscribe((res) => {
      if (res.data == null) return;
      this.fileDataList = res.data;
    });
  }
}
