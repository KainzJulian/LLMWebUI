export class SearchResult {
  id: string;
  modelName: string;
  text: string;

  constructor(data: Partial<SearchResult> = {}) {
    this.id = data.id || '';
    this.modelName = data.modelName || '';
    this.text = data.text || '';
  }
}
