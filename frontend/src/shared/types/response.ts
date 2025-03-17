export class BackendResponse<T> {
  success: boolean;
  data: T | null;
  error: string;
  message: string;

  constructor(data: Partial<BackendResponse<T>> = {}) {
    this.success = data.success || false;
    this.data = data.data || null;
    this.error = data.error || '';
    this.message = data.message || '';
  }
}
