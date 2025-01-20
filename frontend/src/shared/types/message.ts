export class Message {
  role: string;
  content: string;
  images?: Uint8Array[] | string[];

  constructor(data: Partial<Message>) {
    this.role = data.role || '';
    this.content = data.content || '';
    this.images = data.images || [];
  }
}
