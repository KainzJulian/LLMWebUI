import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {
  private isOpenState = signal(true);

  public files = signal<File[]>([]);

  constructor() {
    const files: File[] = [];
    files.push(new File([], 'tester'));
    // files.push(new File([], 'tester2'));
    // files.push(new File([], 'tester3'));
    // files.push(new File([], 'tester4'));
    // files.push(new File([], 'tester4'));
    // files.push(new File([], 'tester4'));
    // files.push(new File([], 'tester4'));
    // files.push(new File([], 'tester4'));
    // files.push(new File([], 'tester4'));
    // files.push(new File([], 'tester4'));
    // files.push(new File([], 'tester4'));
    // files.push(new File([], 'tester4'));
    // files.push(new File([], 'tester4'));
    // files.push(new File([], 'tester4'));
    // files.push(new File([], 'tester4'));

    this.files.set(files);
  }

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
    console.log(input);

    if (input == null || input.dataTransfer == null) return;

    console.log(input.dataTransfer.files);

    if (input.dataTransfer.files == null || input.dataTransfer.files.length <= 0) return;

    const newFiles = Array.from(input.dataTransfer.files);

    console.log(newFiles);

    newFiles.forEach((file) => {
      console.log(file.name);
      console.log(file.size);
      this.saveFile(file);
    });
  }

  saveFile(file: File) {
    const index = this.files().findIndex((val) => val.name == file.name && val.size == file.size);

    if (index == -1) this.files.set([...this.files(), file]);
  }

  saveFileList(file: FileList) {
    for (let i = 0; i < file.length; i++) this.saveFile(file.item(i) as File);
  }

  deleteFile(index: number) {
    const updatedFiles = [...this.files()];
    updatedFiles.splice(index, 1);
    this.files.set(updatedFiles);
  }

  deleteAllFiles() {
    this.files.set([]);
  }
}
