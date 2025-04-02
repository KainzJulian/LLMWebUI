export class FileData {
  constructor(
    public id: string = '',
    public filename: string = '',
    public contentType: string = '',
    public size: number = 0,
    public file: File | null = null,
    public uploadProgress: number = 0,
    public isUploading: boolean = false
  ) {}
}
