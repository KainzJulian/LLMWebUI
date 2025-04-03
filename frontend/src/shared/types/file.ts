export class FileData {
  constructor(
    public id: string = '',
    public filename: string = '',
    public contentType: string = '',
    public size: number = 0,
    public file: File | null = null,
    public isUploading: boolean = false,
    public uploadProgress: number = 0
  ) {}
}
